import React from 'react';
import * as yup from 'yup';
import {StyleSheet} from 'react-native';
import {HStack, VStack} from 'native-base';
import {verticalScale} from '~/utils/style';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import {
  CustomInput,
  CustomButton,
  CustomPicker,
  ProfilePicker,
  CustomContainer,
  CustomKeyboardAwareScrollView,
} from '~/components';

const cityData = [
  {id: 0, title: 'New york', value: 'new_york'},
  {id: 1, title: 'Washington', value: 'washington'},
];

const stateData = [
  {id: 0, title: 'California', value: 'california'},
  {id: 1, title: 'Texas', value: 'texas'},
];

const schema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  userName: yup.string().required('required'),
  email: yup.string().required('required'),
  bio: yup.string().required('required'),
  address: yup.string().required('required'),
  city: yup.string().required('required'),
  state: yup.string().required('required'),
  zipCode: yup.number().required('required'),
});

export default function EditProfileScreen({navigation}: NavigationProp) {
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const {handleSubmit, register, formState} = methods;

  const onEdit = () => {};

  return (
    <CustomContainer>
      <FormProvider {...methods}>
        <CustomKeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <ProfilePicker />
          <VStack py="4" px="4" space="6">
            <CustomInput
              {...register('firstName')}
              label="First name"
              placeholder="Olive"
              {...{formState}}
            />
            <CustomInput
              {...register('lastName')}
              label="Last name"
              placeholder="Anderson"
              {...{formState}}
            />
            <CustomInput
              {...register('userName')}
              label="User name"
              placeholder="Olivia.anderson"
              {...{formState}}
            />
            <CustomInput
              {...register('email')}
              disabled
              label="Email"
              placeholder="example@gmail.com"
              {...{formState}}
            />
            <CustomInput
              {...register('bio')}
              textArea
              label="Bio"
              placeholder="type ..."
              {...{formState}}
            />
            <CustomInput
              {...register('address')}
              label="Street address"
              placeholder="Street address"
              {...{formState}}
            />
            <HStack alignItems="center" space="2">
              <VStack flex={1} h="100%">
                <CustomPicker
                  {...register('city')}
                  label="City"
                  data={cityData}
                  placeholder="Select"
                  height={verticalScale(45)}
                  {...{formState}}
                />
              </VStack>
              <VStack flex={1} h="100%">
                <CustomPicker
                  {...register('state')}
                  label="State"
                  data={stateData}
                  placeholder="Select"
                  height={verticalScale(45)}
                  {...{formState}}
                />
              </VStack>
            </HStack>
            <CustomInput
              {...register('zipCode')}
              label="Zip code"
              placeholder="Zip code"
              {...{formState}}
            />
            <CustomButton
              title="Save"
              height={verticalScale(45)}
              onPress={handleSubmit(onEdit)}
            />
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
});
