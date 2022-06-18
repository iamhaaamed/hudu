import React from 'react';
import * as yup from 'yup';
import {StyleSheet} from 'react-native';
import {Text, VStack} from 'native-base';
import {verticalScale} from '~/utils/style';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import {
  CustomInput,
  CustomButton,
  CustomContainer,
  CustomKeyboardAwareScrollView,
} from '~/components';
import {useForgotPasswordAuth} from '~/hooks/user';

const schema = yup.object().shape({
  email: yup.string().email().required('required'),
});

export default function ForgotPasswordScreen({navigation}: NavigationProp) {
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const {handleSubmit, register, formState} = methods;

  const {forgotPassword, loading: forgotLoading} = useForgotPasswordAuth();

  const onSend = (formData: any) => {
    console.log({formData});
    forgotPassword(formData?.email);
  };

  return (
    <CustomContainer isLoading={forgotLoading}>
      <FormProvider {...methods}>
        <CustomKeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <VStack px="4" pt="10" space="20">
            <Text fontSize="md">
              Please enter the email addresses linked to your HUDU account. A
              link will be sent to reset your password.
            </Text>
            <VStack space="10">
              <CustomInput
                {...register('email')}
                placeholder="Email"
                {...{formState}}
              />
              <CustomButton
                title="Send link"
                height={verticalScale(45)}
                onPress={handleSubmit(onSend)}
              />
            </VStack>
          </VStack>
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
