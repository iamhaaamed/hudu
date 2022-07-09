import * as yup from 'yup';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {HStack, VStack} from 'native-base';
import {verticalScale} from '~/utils/style';
import {stateList} from '~/constants/mockData';
import {useGetLocation} from '~/hooks/location';
import {authStore, userDataStore} from '~/stores';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import {useGetMeProfile, useUpdateProfile} from '~/hooks/user';
import {
  CustomInput,
  CustomButton,
  CustomPicker,
  ProfilePicker,
  CustomContainer,
  CustomKeyboardAwareScrollView,
} from '~/components';

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
  const {isUserLoggedIn} = authStore(state => state);
  const {userData, setUserData} = userDataStore(state => state);

  const {isLoading: getProfileLoading, data: getProfile} = useGetMeProfile({
    enabled: isUserLoggedIn,
  });

  const {mutate: getLocationMutate, isLoading: getLocationLoading} =
    useGetLocation();

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
    getLocationMutate(formData?.zipCode, {
      onSuccess: (success: any) => {
        if (success?.status === 1) {
          const lat = parseFloat(success?.output?.[0]?.latitude);
          const long = parseFloat(success?.output?.[0]?.longitude);
          const input = {
            imageAddress: formData?.imageAddress,
            firstName: formData?.firstName,
            lastName: formData?.lastName,
            userName: formData?.userName,
            bio: formData?.bio,
            city: formData?.city,
            state: formData?.state,
            zipCode: formData?.zipCode,
            streetAddress: formData?.streetAddress,
            point: [lat, long],
            id: userData?.id,
          };
          mutateUpdate(input as any, {
            onSuccess: data => {
              setUserData(data?.user_updateProfile?.result);
            },
          });
        }
      },
    });
  };

  const loading = updateLoading || getProfileLoading || getLocationLoading;

  return (
    <CustomContainer isLoading={loading}>
      <FormProvider {...methods}>
        <CustomKeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <ProfilePicker {...register('imageAddress')} />
          <VStack py="4" px="4" space="2">
            <CustomInput
              {...register('firstName')}
              label="First name"
              placeholder="First name"
              {...{formState}}
            />
            <CustomInput
              {...register('lastName')}
              label="Last name"
              placeholder="Last name"
              {...{formState}}
            />
            <CustomInput
              {...register('userName')}
              label="User name"
              placeholder="User name"
              {...{formState}}
            />
            <CustomInput
              {...register('email')}
              disabled
              label="Email"
              placeholder="example@gmail.com"
              keyboardType="email-address"
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
                />
              </VStack>
              <VStack flex={1} h="100%">
                <CustomPicker
                  {...register('state')}
                  label="State"
                  data={stateList}
                  placeholder="Select"
                  height={verticalScale(45)}
                  {...{formState}}
                  valueKey="value"
                  titleKey="title"
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
              mt="3"
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
