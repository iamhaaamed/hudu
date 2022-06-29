import React from 'react';
import {StyleSheet} from 'react-native';
import {VStack, Center, HStack} from 'native-base';
import {
  CustomContainer,
  CustomKeyboardAwareScrollView,
  CustomInput,
  CustomPicker,
  CustomButton,
  SectionProjectImages,
  CustomSwitch,
} from '~/components';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Colors} from '~/styles';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {stateList} from '~/constants/mockData';
import {userDataStore} from '~/stores';
import {showMessage} from 'react-native-flash-message';

const availabilityData = [
  {id: 0, title: 'Specific time', value: 'SPECIFIC_TIME'},
  {id: 1, title: 'Flexible', value: 'FLEXIBLE'},
];

const locationData = [
  {title: 'Current location', value: 'CURRENT_LOCATION'},
  {title: 'New address', value: 'NEW_ADDRESS'},
];

const schema = yup.object().shape({
  projectImages: yup.array().nullable(),
  title: yup.string().required('required').nullable(),
  description: yup.string().required('required').nullable(),
  availability: yup.string().required('required').nullable(),
  duration: yup.number().when('availability', {
    is: 'SPECIFIC_TIME',
    then: yup
      .number()
      .typeError('you must specify a number')
      .required('required')
      .nullable(),
  }),
  location: yup.string().nullable(),
  streetAddress: yup.string().when('location', {
    is: 'NEW_ADDRESS',
    then: yup.string().required('required').nullable(),
  }),
  city: yup.string().when('location', {
    is: 'NEW_ADDRESS',
    then: yup.string().required('required').nullable(),
  }),
  state: yup.string().when('location', {
    is: 'NEW_ADDRESS',
    then: yup.string().required('required').nullable(),
  }),
  zipCode: yup.string().when('location', {
    is: 'NEW_ADDRESS',
    then: yup
      .string()
      .required('required')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(5, 'Must be exactly 5 digits')
      .max(5, 'Must be exactly 5 digits')
      .nullable(),
  }),
});

const PostScreen = ({navigation}: NavigationProp) => {
  const {userData} = userDataStore(state => state);
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
    defaultValues: {
      location: 'NEW_ADDRESS',
    },
  });

  const {handleSubmit, register, watch, formState} = methods;

  const availability = watch('availability');
  const location = watch('location');

  const previewOnPress = (formData: any) => {
    if (availability !== 'SPECIFIC_TIME') {
      let input = {};
      if (location === 'NEW_ADDRESS') {
        input = {
          duration: formData?.duration,
          projectImages: formData?.projectImages ? formData?.projectImages : [],
          title: formData?.title,
          description: formData?.description,
          availability: formData?.availability,
          streetAddress: formData?.streetAddress,
          city: formData?.city,
          state: formData?.state,
          zipCode: formData?.zipCode,
        };
        goToNext(input, 'Flexible');
      } else {
        if (
          userData?.streetAddress &&
          userData?.city &&
          userData?.state &&
          userData?.zipCode
        ) {
          input = {
            duration: formData?.duration,
            projectImages: formData?.projectImages
              ? formData?.projectImages
              : [],
            title: formData?.title,
            description: formData?.description,
            availability: formData?.availability,
            streetAddress: userData?.streetAddress,
            city: userData?.city,
            state: userData?.state,
            zipCode: userData?.zipCode,
          };
          goToNext(input, 'Flexible');
        } else {
          showMessage({
            message: 'Please complete your profile',
            type: 'info',
            icon: 'info',
          });
        }
      }
    } else {
      let input = {};
      if (location === 'NEW_ADDRESS') {
        input = {
          duration: 0,
          projectImages: formData?.projectImages,
          title: formData?.title,
          description: formData?.description,
          availability: formData?.availability,
          streetAddress: formData?.streetAddress,
          city: formData?.city,
          state: formData?.state,
          zipCode: formData?.zipCode,
        };
        goToNext(input, 'Specific time');
      } else {
        if (
          userData?.streetAddress &&
          userData?.city &&
          userData?.state &&
          userData?.zipCode
        ) {
          input = {
            duration: 0,
            projectImages: formData?.projectImages,
            title: formData?.title,
            description: formData?.description,
            availability: formData?.availability,
            streetAddress: userData?.streetAddress,
            city: userData?.city,
            state: userData?.state,
            zipCode: userData?.zipCode,
          };
          goToNext(input, 'Specific time');
        } else {
          showMessage({
            message: 'Please complete your profile',
            type: 'info',
            icon: 'info',
          });
        }
      }
    }
  };

  const goToNext = (input: any, availabilityInput: string) => {
    navigation.navigate('PreviewPost', {
      params: input,
      availability: availabilityInput,
    });
  };

  return (
    <CustomContainer>
      <FormProvider {...methods}>
        <CustomKeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <VStack py="4" space="6">
            <SectionProjectImages {...register('projectImages')} />
            <VStack px="4" space="3" flex={1}>
              <CustomInput
                {...register('title')}
                placeholder="Title"
                backgroundColor={Colors.WHITE}
                inputStyle={styles.input}
                {...{formState}}
              />
              <CustomInput
                {...register('description')}
                placeholder="Description"
                backgroundColor={Colors.WHITE}
                inputStyle={styles.input}
                textArea
                {...{formState}}
              />
              <CustomPicker
                {...register('availability')}
                label="Availability to complete project"
                data={availabilityData}
                placeholder="Select"
                height={verticalScale(45)}
                textStyle={styles.input}
              />
              {availability && availability === 'SPECIFIC_TIME' && (
                <CustomInput
                  {...register('duration')}
                  placeholder="what times the project can be completed"
                  keyboardType="numeric"
                  backgroundColor={Colors.WHITE}
                  inputStyle={styles.input}
                  fontSize={scale(12)}
                  labelFontSize={scale(12)}
                  {...{formState}}
                />
              )}
              <CustomSwitch {...register('location')} data={locationData} />
              {location === 'NEW_ADDRESS' && (
                <>
                  <CustomInput
                    {...register('streetAddress')}
                    placeholder="Street Address"
                    backgroundColor={Colors.WHITE}
                    inputStyle={styles.input}
                    {...{formState}}
                  />
                  <HStack alignItems="center" space="2">
                    <Center flex={1}>
                      <CustomInput
                        {...register('city')}
                        label="City"
                        placeholder="City"
                        {...{formState}}
                        height={verticalScale(45)}
                        isHorizontal
                      />
                    </Center>
                    <Center flex={1}>
                      <CustomPicker
                        {...register('state')}
                        data={stateList}
                        placeholder="State"
                        height={verticalScale(45)}
                        textStyle={styles.input}
                        isHorizontal
                        valueKey="value"
                        titleKey="title"
                      />
                    </Center>
                  </HStack>
                  <CustomInput
                    {...register('zipCode')}
                    placeholder="Zip code"
                    keyboardType="numeric"
                    backgroundColor={Colors.WHITE}
                    inputStyle={styles.input}
                    {...{formState}}
                    validation
                  />
                </>
              )}
              <CustomButton
                title="Preview"
                onPress={handleSubmit(previewOnPress)}
                height={verticalScale(45)}
              />
            </VStack>
          </VStack>
        </CustomKeyboardAwareScrollView>
      </FormProvider>
    </CustomContainer>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
  input: {
    flex: 1,
    fontSize: scale(14),
    fontFamily: fontFamily.regular,
  },
});
