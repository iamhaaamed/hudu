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
const cityData = [
  {id: 0, title: 'City 1', value: 'city1'},
  {id: 1, title: 'City 2', value: 'city2'},
  {id: 2, title: 'City 3', value: 'city3'},
];
const stateData = [
  {id: 0, title: 'State 1', value: 'state1'},
  {id: 1, title: 'State 2', value: 'state2'},
  {id: 2, title: 'State 3', value: 'state3'},
  {id: 3, title: 'State 4', value: 'state4'},
  {id: 4, title: 'State 5', value: 'state5'},
  {id: 5, title: 'State 6', value: 'state6'},
  {id: 6, title: 'State 7', value: 'state7'},
  {id: 7, title: 'State 8', value: 'state8'},
  {id: 8, title: 'State 9', value: 'state9'},
  {id: 9, title: 'State 10', value: 'state10'},
  {id: 10, title: 'State 11', value: 'state11'},
  {id: 11, title: 'State 12', value: 'state12'},
  {id: 12, title: 'State 13', value: 'state13'},
  {id: 13, title: 'State 14', value: 'state14'},
  {id: 14, title: 'State 15', value: 'state15'},
  {id: 15, title: 'State 16', value: 'state16'},
  {id: 16, title: 'State 17', value: 'state17'},
  {id: 17, title: 'State 18', value: 'state18'},
  {id: 18, title: 'State 19', value: 'state19'},
  {id: 19, title: 'State 20', value: 'state20'},
];

const schema = yup.object().shape({
  title: yup.string().required('required'),
  description: yup.string().required('required'),
  expectation: yup.string().required('required'),
  duration: yup.number().when('expectation', {
    is: 'specific',
    then: yup.number().required('required'),
  }),
  streetAddress: yup.string().required('required'),
  city: yup.string().required('required'),
  state: yup.string().required('required'),
  zipCode: yup.number().required('required'),
});

const PostScreen = ({navigation}: any) => {
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const {handleSubmit, register, watch} = methods;

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
              />
              <CustomInput
                {...register('description')}
                placeholder="Description"
                backgroundColor={Colors.WHITE}
                inputStyle={styles.input}
                textArea
              />
              <CustomPicker
                {...register('expectation')}
                label="Expectation for Project Completion"
                data={expectationData}
                placeholder="Select"
                height={verticalScale(54)}
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
                />
              )}
              <CustomInput
                {...register('streetAddress')}
                placeholder="Street Address"
                backgroundColor={Colors.WHITE}
                inputStyle={styles.input}
              />
              <HStack alignItems="center" space="2">
                <VStack flex={1} h="100%">
                  <CustomPicker
                    {...register('city')}
                    data={cityData}
                    placeholder="City"
                    height={verticalScale(54)}
                    textStyle={styles.input}
                  />
                </VStack>
                <VStack flex={1} h="100%">
                  <CustomPicker
                    {...register('state')}
                    data={stateData}
                    placeholder="State"
                    height={verticalScale(54)}
                    textStyle={styles.input}
                  />
                </VStack>
              </HStack>
              <CustomInput
                {...register('zipCode')}
                placeholder="Zip code"
                keyboardType="numeric"
                backgroundColor={Colors.WHITE}
                inputStyle={styles.input}
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
