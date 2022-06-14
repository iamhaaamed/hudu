import React, {useEffect} from 'react';
import * as yup from 'yup';
import {StyleSheet} from 'react-native';
import {HStack, VStack} from 'native-base';
import {verticalScale} from '~/utils/style';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import {authStore, userDataStore} from '~/stores';
import {
  CustomInput,
  CustomButton,
  CustomPicker,
  ProfilePicker,
  CustomContainer,
  CustomKeyboardAwareScrollView,
} from '~/components';
import {useGetProfile, useUpdateProfile} from '~/hooks/user';

const stateData = [
  {id: 0, title: 'California', value: 'california'},
  {id: 1, title: 'Texas', value: 'texas'},
];

const schema = yup.object().shape({
  imageAddress: yup.string().nullable(),
  firstName: yup.string().required('required').nullable(),
  lastName: yup.string().required('required').nullable(),
  userName: yup.string().required('required').nullable(),
  email: yup.string().required('required').nullable(),
  bio: yup.string().required('required').nullable(),
  streetAddress: yup.string().required('required').nullable(),
  city: yup.string().required('required').nullable(),
  state: yup.string().required('required').nullable(),
  zipCode: yup
    .string()
    .required('required')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(5, 'Must be exactly 5 digits')
    .max(5, 'Must be exactly 5 digits')
    .nullable(),
});

export default function EditProfileScreen() {
  const {userData} = userDataStore(state => state);
  const {isUserLoggedIn} = authStore(state => state);

  const {isLoading: getProfileLoading, data: getProfile} = useGetProfile({
    enabled: isUserLoggedIn,
  });

  const profile = getProfile?.user_getProfile?.result ?? {};

  const {mutate: mutateUpdate, isLoading: updateLoading} = useUpdateProfile();

  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const {handleSubmit, register, formState, setValue} = methods;

  useEffect(() => {
    if (profile) {
      setValue('imageAddress', profile?.imageAddress);
      setValue('firstName', profile?.firstName);
      setValue('lastName', profile?.lastName);
      setValue('userName', profile?.userName);
      setValue('email', profile?.email);
      setValue('bio', profile?.bio);
      setValue('streetAddress', profile?.streetAddress);
      setValue('city', profile?.city);
      setValue('state', profile?.state);
      setValue('zipCode', profile?.zipCode);
    }
  }, [profile]);

  const onEdit = async (formData: any) => {
    const input = {
      imageAddress: formData?.imageAddress,
      firstName: formData?.firstName,
      lastName: formData?.lastName,
      userName: formData?.userName,
      bio: formData?.bio,
      city: formData?.city,
      state: formData?.state,
      zipCode: formData?.zipCode,
      point: [40.73254, -74.368358],
      id: userData?.id,
    };
    mutateUpdate(input, {
      onSuccess: (successData: any) => {},
      onError: (errorData: any) => {},
    });
  };

  const loading = updateLoading || getProfileLoading;

  return (
    <CustomContainer isLoading={loading}>
      <FormProvider {...methods}>
        <CustomKeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <ProfilePicker {...register('imageAddress')} />
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
              {...register('streetAddress')}
              label="Street address"
              placeholder="Street address"
              {...{formState}}
            />
            <HStack alignItems="center" space="2">
              <VStack flex={1} h="100%">
                <CustomInput
                  {...register('city')}
                  label="City"
                  placeholder="City"
                  {...{formState}}
                  height={verticalScale(45)}
                  isHorizontal
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
                  isHorizontal
                />
              </VStack>
            </HStack>
            <CustomInput
              {...register('zipCode')}
              label="Zip code"
              placeholder="Zip code"
              {...{formState}}
              keyboardType="numeric"
              validation
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
