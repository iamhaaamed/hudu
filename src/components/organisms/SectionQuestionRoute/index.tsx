import React from 'react';
import * as yup from 'yup';
import {Colors} from '~/styles';
import {CustomInput} from '~/components';
import {fontFamily, scale} from '~/utils/style';
import {FlatList, StyleSheet} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import Feather from 'react-native-vector-icons/Feather';
import {Box, HStack, IconButton, Text, VStack} from 'native-base';

const schema = yup.object().shape({
  message: yup.string().required('required'),
});

const SectionQuestionRoute = ({data}: any) => {
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
    <VStack pt={4} pb={6}>
      <FlatList
        data={data}
        renderItem={renderItem}
        scrollEventThrottle={1}
        keyExtractor={(_, i) => String(i)}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
        contentContainerStyle={styles.contentContainerStyle}
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
    </VStack>
  );
};

export default SectionQuestionRoute;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    minHeight: 100,
  },
});
