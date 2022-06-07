import React from 'react';
import * as yup from 'yup';
import {Colors} from '~/styles';
import {StyleSheet} from 'react-native';
import {verticalScale} from '~/utils/style';
import {Box, Text, VStack} from 'native-base';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import {
  CustomImage,
  CustomInput,
  CustomButton,
  CustomContainer,
  CustomKeyboardAwareScrollView,
} from '~/components';
import images from '~/assets/images';

const schema = yup.object().shape({
  title: yup.string().required('required'),
  message: yup.string().required('required'),
});

export default function SupportScreen() {
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const {handleSubmit, register, watch} = methods;

  const onSend = () => {};

  return (
    <CustomContainer>
      <FormProvider {...methods}>
        <CustomKeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <VStack alignItems="center">
            <CustomImage
              local
              style={styles.image}
              imageSource={images.support}
              backgroundColor={Colors.WHITE}
            />
          </VStack>
          <VStack flex={1} py="4" px="4" space="6">
            <Text color={Colors.BLACK_2} fontSize="md" px="2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            <CustomInput {...register('title')} placeholder="Title" />
            <CustomInput
              {...register('message')}
              textArea
              placeholder="Your message"
            />
          </VStack>
          <Box px="4" pb="4" pt="2">
            <CustomButton
              title="Send"
              height={verticalScale(45)}
              onPress={() => handleSubmit(onSend)}
            />
          </Box>
        </CustomKeyboardAwareScrollView>
      </FormProvider>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
  image: {
    width: '90%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
});
