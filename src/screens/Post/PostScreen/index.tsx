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
} from '~/components';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Colors} from '~/styles';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {stateList} from '~/constants/mockData';

const availabilityData = [
  {id: 0, title: 'Specific time', value: 'SPECIFIC_TIME'},
  {id: 1, title: 'Flexible', value: 'FLEXIBLE'},
];

const schema = yup.object().shape({
  projectImages: yup.array().required('required').nullable(),
  title: yup.string().required('required').nullable(),
  description: yup.string().required('required').nullable(),
  availability: yup.string().required('required').nullable(),
  duration: yup.number().when('availability', {
    is: 'SPECIFIC_TIME',
    then: yup.number().required('required').nullable(),
  }),
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

const PostScreen = ({navigation}: NavigationProp) => {
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const {handleSubmit, register, watch, formState} = methods;

  const availability = watch('availability');

  const previewOnPress = (formData: any) => {
    if (availability !== 'SPECIFIC_TIME') {
      const input = {...formData, duration: 0};
      navigation.navigate('PreviewPost', {params: input});
    } else {
      navigation.navigate('PreviewPost', {params: formData});
    }
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
                  //placeholder="Please list what days and times the project can be completed"
                  placeholder="Duration"
                  keyboardType="numeric"
                  backgroundColor={Colors.WHITE}
                  inputStyle={styles.input}
                  //fontSize={scale(10)}
                  //labelFontSize={scale(10)}
                  {...{formState}}
                />
              )}
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
                    valueKey="title"
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
