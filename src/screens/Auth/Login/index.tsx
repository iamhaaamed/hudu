import React from 'react';
import * as yup from 'yup';
import {Colors} from '~/styles';
import images from '~/assets/images';
import {StyleSheet} from 'react-native';
import {verticalScale} from '~/utils/style';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import {Box, Button, Flex, HStack, Text, VStack} from 'native-base';
import {
  CustomImage,
  CustomInput,
  CustomButton,
  CustomContainer,
  SectionRowSocial,
  CustomKeyboardAwareScrollView,
} from '~/components';

const schema = yup.object().shape({
  email: yup.string().email().required('required'),
  password: yup.string().required('required'),
});

export default function LoginScreen({navigation}: NavigationProp) {
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const {handleSubmit, register} = methods;

  const onSend = () => {};

  return (
    <CustomContainer>
      <FormProvider {...methods}>
        <CustomKeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <VStack alignItems="center" mt="4">
            <CustomImage
              local
              style={styles.image}
              imageSource={images.login}
              backgroundColor={Colors.WHITE}
            />
          </VStack>
          <Flex flex={1} justifyContent="flex-end" pb="6">
            <VStack pt="4" px="4" space="6">
              <CustomInput {...register('email')} placeholder="Email" />
              <CustomInput {...register('password')} placeholder="Password" />
            </VStack>
            <Button
              variant="link"
              alignSelf="flex-end"
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text color={Colors.PRIMARY}>Forgot Password ?</Text>
            </Button>
            <Box px="4" py="4">
              <CustomButton
                title="Login"
                height={verticalScale(45)}
                onPress={() => handleSubmit(onSend)}
              />
            </Box>
            <SectionRowSocial />
            <HStack alignItems="center" justifyContent="center">
              <Text fontSize="md">Don't have an account?</Text>
              <Button
                px={1}
                variant="link"
                onPress={() => navigation.navigate('SignUp')}>
                <Text underline color={Colors.PRIMARY} fontSize="md">
                  Create account
                </Text>
              </Button>
            </HStack>
          </Flex>
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
    aspectRatio: 1.2,
    alignSelf: 'center',
  },
});