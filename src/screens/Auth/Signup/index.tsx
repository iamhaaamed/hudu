import * as yup from 'yup';
import {Colors} from '~/styles';
import images from '~/assets/images';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {verticalScale} from '~/utils/style';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import {Box, Button, Flex, HStack, Text, VStack} from 'native-base';
import {
  useAppleAuth,
  useFacebookAuth,
  useGoogleAuth,
  useSignUp,
  useSignUpAuth,
} from '~/hooks/user';
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
  password: yup
    .string()
    .min(6, 'Must be 6 characters or more')
    .max(36, 'Must be 36 characters or less')
    .required('Required'),
  confirm: yup
    .string()
    .min(6, 'Must be 6 characters or more')
    .max(36, 'Must be 36 characters or less')
    .required('required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default function SignUpScreen({navigation}: NavigationProp) {
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const {signUpWithEmailAndPass} = useSignUpAuth();
  const {mutate: signUpMutate} = useSignUp();
  const {signInWithGoogle} = useGoogleAuth();
  const {signInWithFacebook} = useFacebookAuth();
  const {signInWithApple} = useAppleAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const {handleSubmit, register, formState} = methods;

  const signInOnPress = () => {
    navigation.replace('Login');
  };

  const signUpOnPress = async (formData: any) => {
    setLoading(true);
    const signUpRes = await signUpWithEmailAndPass(
      formData?.email,
      formData.password,
    );
    if (signUpRes?.data) {
      completeSignUp();
    } else {
      setLoading(false);
    }
  };

  const googleOnPress = async () => {
    setLoading(true);
    const res = await signInWithGoogle();
    if (res?.data) {
      completeSignUp();
    } else {
      setLoading(false);
    }
  };

  const facebookOnPress = async () => {
    setLoading(true);
    const res = await signInWithFacebook();
    if (res?.data) {
      completeSignUp();
    } else {
      setLoading(false);
    }
  };

  const appleOnPress = async () => {
    setLoading(true);
    const res = await signInWithApple();
    if (res?.data) {
      completeSignUp();
    } else {
      setLoading(false);
    }
  };

  const completeSignUp = async () => {
    signUpMutate(
      {},
      {
        onSuccess: () => {
          setLoading(false);
        },
        onError: () => {
          setLoading(false);
        },
      },
    );
  };

  return (
    <CustomContainer isLoading={loading}>
      <FormProvider {...methods}>
        <CustomKeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <VStack alignItems="center" mt="4">
            <CustomImage
              local
              style={styles.image}
              imageSource={images.register}
              backgroundColor={Colors.WHITE}
            />
          </VStack>
          <Flex flex={1} justifyContent="flex-end" pb="6">
            <VStack py="4" px="4" space="6">
              <CustomInput
                {...register('email')}
                placeholder="Email"
                keyboardType="email-address"
                {...{formState}}
                validation
              />
              <CustomInput
                {...register('password')}
                placeholder="Password"
                {...{formState}}
                validation
                inputType="password"
              />
              <CustomInput
                {...register('confirm')}
                placeholder="Confirm password"
                {...{formState}}
                validation
                inputType="password"
              />
            </VStack>
            <Box px="4" py="4">
              <CustomButton
                title="Create account"
                height={verticalScale(45)}
                onPress={handleSubmit(signUpOnPress)}
              />
            </Box>
            <SectionRowSocial
              {...{googleOnPress, facebookOnPress, appleOnPress}}
            />
            <HStack alignItems="center" justifyContent="center">
              <Text fontSize="md">Already have an account?</Text>
              <Button px={1} variant="link" onPress={signInOnPress}>
                <Text underline color={Colors.PRIMARY} fontSize="md">
                  Sign in
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
