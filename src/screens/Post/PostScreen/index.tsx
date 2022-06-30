import React, {useState} from 'react';
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
  QuestionModal,
  PreviewPostModal,
} from '~/components';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Colors} from '~/styles';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {stateList} from '~/constants/mockData';
import {userDataStore} from '~/stores';
import {showMessage} from 'react-native-flash-message';
import {useAddProject} from '~/hooks/project';
import {ResponseStatus} from '~/generated/graphql';
import {useGetLocation} from '~/hooks/location';
import {getResponseMessage} from '~/utils/helper';
import queryKeys from '~/constants/queryKeys';
import {useQueryClient} from 'react-query';
import {resetRoot} from '~/navigation/Methods';

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
  const queryClient = useQueryClient();

  const {userData} = userDataStore(state => state);

  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
    defaultValues: {
      location: 'NEW_ADDRESS',
    },
  });

  const {handleSubmit, register, watch, formState, reset} = methods;

  const availability = watch('availability');
  const location = watch('location');

  const [questionModalVisible, setQuestionModalVisible] =
    useState<boolean>(false);
  const [previewPostModalVisible, setPreviewPostModalVisible] =
    useState<boolean>(false);
  const [inputData, setInputData] = useState();
  const [availabilityInput, setAvailabilityInput] = useState();

  const {mutate: addProjectMutate, isLoading: addProjectLoading} =
    useAddProject();
  const {mutate: getLocationMutate, isLoading: getLocationLoading} =
    useGetLocation();

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

  const goToNext = (input: any, availabilityInputData: any) => {
    setInputData(input);
    setAvailabilityInput(availabilityInputData);
    setPreviewPostModalVisible(true);
  };

  const listProjectOnPress = () => {
    getLocationMutate(inputData?.zipCode, {
      onSuccess: (success: any) => {
        if (success?.status === 1) {
          const lat = parseFloat(success?.output?.[0]?.latitude);
          const long = parseFloat(success?.output?.[0]?.longitude);
          const input = {...inputData, point: [lat, long]};
          addProjectMutate(input, {
            onSuccess: successData => {
              if (
                successData?.project_addProject?.status ===
                ResponseStatus.Success
              ) {
                queryClient.invalidateQueries(queryKeys.projects);
                queryClient.invalidateQueries(queryKeys.bids);
                setQuestionModalVisible(true);
              } else {
                showMessage(
                  getResponseMessage(successData?.project_addProject?.status),
                );
              }
            },
          });
        }
      },
      onError: error => {
        console.log({error});
      },
    });
  };

  const onCloseQuestionModal = () => {
    setQuestionModalVisible(false);
  };

  const onClosePreviewPostModal = () => {
    setPreviewPostModalVisible(false);
  };

  const option1OnPress = () => {
    setQuestionModalVisible(false);
    setPreviewPostModalVisible(false);
    reset({location: 'NEW_ADDRESS'});
    navigation.navigate('ProjectsStack');
  };

  const option2OnPress = () => {
    setQuestionModalVisible(false);
    setPreviewPostModalVisible(false);
    reset({location: 'NEW_ADDRESS'});
    navigation.navigate('ProjectsStack', {
      screen: 'Projects',
      params: {pageNumber: 1},
    });
  };

  const editOnPress = () => {
    setPreviewPostModalVisible(false);
  };

  const cancelOnPress = () => {
    setPreviewPostModalVisible(false);
    resetRoot('HomeStack');
  };

  const loading = addProjectLoading || getLocationLoading;

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
      <QuestionModal
        visible={questionModalVisible}
        onClose={onCloseQuestionModal}
        title="Congratulations, your project has been listed"
        option1="Take me to my Project"
        option2="Take me to my HUDU"
        option1OnPress={option1OnPress}
        option2OnPress={option2OnPress}
      />
      <PreviewPostModal
        visible={previewPostModalVisible}
        onClose={onClosePreviewPostModal}
        availability={availabilityInput}
        data={inputData}
        listProjectOnPress={listProjectOnPress}
        editOnPress={editOnPress}
        cancelOnPress={cancelOnPress}
        loading={loading}
      />
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
