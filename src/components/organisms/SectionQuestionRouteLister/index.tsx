import React from 'react';
import {Animated, StyleSheet, useWindowDimensions} from 'react-native';
import {HStack, Text, VStack, IconButton, Box} from 'native-base';
import {HEADER_HEIGHT, TAB_BAR_HEIGHT, OTHER_PADDING} from '~/styles/spacing';
import {fontFamily, scale} from '~/utils/style';
import {Colors} from '~/styles';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {CustomInput} from '~/components';
import Feather from 'react-native-vector-icons/Feather';

const schema = yup.object().shape({
  message: yup.string().required('required'),
});

const SectionQuestionRouteLister = ({
  position,
  syncOffset,
  questionRef,
  onMomentumScrollBegin,
  data,
}: any) => {
  const {height} = useWindowDimensions();

  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const {handleSubmit, register, watch} = methods;

  const sendOnPress = () => {};

  const renderItem = ({item}: {item: any}) => {
    return (
      <HStack space="4" px="4">
        <Text
          fontSize={scale(14)}
          fontFamily={fontFamily.medium}
          color={Colors.BLACK_1}>
          {item?.user?.name}:
        </Text>
        <Text
          flex={1}
          fontSize={scale(14)}
          fontFamily={fontFamily.regular}
          color={Colors.PLACEHOLDER}>
          {item?.message}
        </Text>
      </HStack>
    );
  };

  const ItemSeparatorComponent = () => <Box h="4" />;

  const messageText = watch('message');

  return (
    <>
      <Animated.FlatList
        ref={questionRef}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: position}}}],
          {useNativeDriver: true},
        )}
        onMomentumScrollEnd={e => {
          syncOffset('question', e.nativeEvent.contentOffset.y);
        }}
        data={data}
        keyExtractor={(item, i) => String(i)}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        contentContainerStyle={[
          styles.contentContainerStyle,
          {
            minHeight: height,
          },
        ]}
      />
      <VStack px="4" py="4">
        <FormProvider {...methods}>
          <CustomInput
            {...register('message')}
            placeholder="Cannot find your question? Type it here"
            backgroundColor={Colors.WHITE}
            rightComponent={() => (
              <IconButton
                onPress={sendOnPress}
                colorScheme={Colors.WHITE_RIPPLE_COLOR}
                borderRadius="full"
                icon={
                  <Feather name="navigation" color={Colors.BLACK_3} size={24} />
                }
                style={{transform: [{rotate: '45deg'}]}}
              />
            )}
          />
        </FormProvider>
      </VStack>
    </>
  );
};

export default SectionQuestionRouteLister;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: HEADER_HEIGHT + TAB_BAR_HEIGHT + OTHER_PADDING,
  },
});
