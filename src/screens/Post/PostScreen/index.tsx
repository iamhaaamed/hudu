import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {FlatList, VStack, Center, HStack} from 'native-base';
import {
  CustomContainer,
  CustomKeyboardAwareScrollView,
  CustomImageUploader,
  ImageBoxViewer,
  CustomInput,
  CustomPicker,
  CustomButton,
} from '~/components';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Colors} from '~/styles';
import {fontFamily, scale, verticalScale} from '~/utils/style';

const expectationData = [
  {id: 0, title: 'Specific time', value: 'specific'},
  {id: 1, title: 'Flexible', value: 'flexible'},
];
const stateData = [
  {id: 0, title: 'California', value: 'california'},
  {id: 1, title: 'Texas', value: 'texas'},
];

const schema = yup.object().shape({
  title: yup.string().required('required').nullable(),
  description: yup.string().required('required').nullable(),
  expectation: yup.string().required('required').nullable(),
  duration: yup.number().when('expectation', {
    is: 'specific',
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

  const expectation = watch('expectation');

  const [images, setImages] = useState<string[]>([]);

  const onUploadImage = (image: string) => {
    setImages(prevState => [...prevState, image]);
  };

  const onDeleteImage = (image: string, index: number) => {
    setImages(imageData => imageData.filter((_, indx) => indx !== index));
  };

  const previewOnPress = (formData: any) => {
    const inputData = {
      ...formData,
      images,
    };
    navigation.navigate('PreviewPost', {params: inputData});
  };

  const ListHeaderComponent = () => (
    <Center mx="4">
      <CustomImageUploader onUploadImage={onUploadImage} />
    </Center>
  );

  const renderItem = ({item, index}: {item: any; index: number}) => (
    <Center mr="4">
      <ImageBoxViewer
        {...{item, onDelete: (itm: string) => onDeleteImage(itm, index)}}
      />
    </Center>
  );

  return (
    <CustomContainer>
      <FormProvider {...methods}>
        <CustomKeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <VStack py="4" space="6">
            <FlatList
              data={images}
              ListHeaderComponent={ListHeaderComponent}
              renderItem={renderItem}
              keyExtractor={(_, index: number) => `img${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
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
                {...register('expectation')}
                label="Expectation for Project Completion"
                data={expectationData}
                placeholder="Select"
                height={verticalScale(45)}
                textStyle={styles.input}
              />
              {expectation && expectation === 'specific' && (
                <CustomInput
                  {...register('duration')}
                  placeholder="Duration"
                  keyboardType="numeric"
                  rightText="Day"
                  backgroundColor={Colors.WHITE}
                  inputStyle={styles.input}
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
                    data={stateData}
                    placeholder="State"
                    height={verticalScale(45)}
                    textStyle={styles.input}
                    isHorizontal
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
