import React, {forwardRef, useCallback, memo} from 'react';
import {FlatList} from 'react-native';
import Animated from 'react-native-reanimated';
import {Box, HStack, IconButton, Text, VStack} from 'native-base';
import * as yup from 'yup';
import {Colors} from '~/styles';
import {CustomInput} from '~/components';
import {fontFamily, scale} from '~/utils/style';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import Feather from 'react-native-vector-icons/Feather';

const schema = yup.object().shape({
  message: yup.string().required('required'),
});

export const AnimatedFlatList: typeof FlatList =
  Animated.createAnimatedComponent(FlatList);

const SectionQuestionRoute = forwardRef(
  (
    {
      data,
      contentContainerStyle,
      onMomentumScrollEnd,
      onScrollEndDrag,
      scrollEventThrottle,
      scrollIndicatorInsets,
      onScroll,
    }: any,
    ref,
  ) => {
    const {...methods} = useForm<Record<string, any>, object>({
      resolver: yupResolver<yup.AnyObjectSchema>(schema),
      mode: 'onChange',
    });

    const {handleSubmit, register, watch, formState} = methods;

    const sendOnPress = () => {};

    const keyExtractor = useCallback((_, index: number) => `key${index}`, []);

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
      <VStack flex={1} pt={4} pb={6} bg={Colors.WHITE}>
        <AnimatedFlatList
          ref={ref}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          {...{
            data,
            onScroll,
            contentContainerStyle,
            onMomentumScrollEnd,
            onScrollEndDrag,
            scrollEventThrottle,
            scrollIndicatorInsets,
          }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
        <VStack px="4" py="4">
          <FormProvider {...methods}>
            <CustomInput
              {...register('message')}
              placeholder="Cannot find your question? Type it here"
              backgroundColor={Colors.WHITE}
              {...{formState}}
              rightComponent={() => (
                <IconButton
                  onPress={sendOnPress}
                  colorScheme={Colors.WHITE_RIPPLE_COLOR}
                  borderRadius="full"
                  icon={
                    <Feather
                      name="navigation"
                      color={Colors.BLACK_3}
                      size={24}
                    />
                  }
                  style={{transform: [{rotate: '45deg'}]}}
                />
              )}
            />
          </FormProvider>
        </VStack>
      </VStack>
    );
  },
);

export default memo(SectionQuestionRoute);
