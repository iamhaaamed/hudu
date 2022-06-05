import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {FlatList, VStack, Center, HStack, ScrollView, Text} from 'native-base';
import {
  CustomContainer,
  ImageBoxViewer,
  CustomButton,
  QuestionModal,
} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {resetRoot} from '~/navigation/Methods';

const PreviewPostScreen = ({navigation, route}: any) => {
  const {params} = route?.params;

  const [questionModalVisible, setQuestionModalVisible] =
    useState<boolean>(false);

  const editOnPress = () => {
    navigation.goBack();
  };

  const cancelOnPress = () => {
    resetRoot('HomeStack');
  };

  const listProjectOnPress = () => {
    setQuestionModalVisible(true);
  };

  const onCloseQuestionModal = () => {
    setQuestionModalVisible(false);
  };
  const option1OnPress = () => {
    setQuestionModalVisible(false);
    navigation.navigate('ProjectsStack');
  };
  const option2OnPress = () => {
    setQuestionModalVisible(false);
    navigation.navigate('ProjectsStack');
  };

  const renderItem = ({item, index}: {item: any; index: number}) => (
    <Center ml="4" mr={index === params?.images?.length ? '4' : '0'}>
      <ImageBoxViewer {...{item}} />
    </Center>
  );

  return (
    <CustomContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <VStack py="4" space="6">
          <HStack px="8" space="2">
            <Center flex={1}>
              <CustomButton
                outline
                color={Colors.BLACK_3}
                title="Edit"
                height={verticalScale(35)}
                onPress={editOnPress}
              />
            </Center>
            <Center flex={1}>
              <CustomButton
                color={Colors.CANCEL_BUTTON}
                borderColor={Colors.ERROR}
                textColor={Colors.ERROR}
                title="Cancel"
                height={verticalScale(35)}
                onPress={cancelOnPress}
              />
            </Center>
          </HStack>
          <FlatList
            data={params?.images || []}
            renderItem={renderItem}
            keyExtractor={(_, index: number) => `img${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <VStack px="4" space="6">
            <Text
              fontSize={scale(20)}
              fontFamily={fontFamily.medium}
              color={Colors.BLACK}>
              {params?.title}
            </Text>
            <Text
              fontSize={scale(16)}
              fontFamily={fontFamily.regular}
              color={Colors.PLACEHOLDER}>
              {params?.description}
            </Text>
            <HStack alignItems="center" justifyContent="space-between">
              <Text
                fontSize={scale(16)}
                fontFamily={fontFamily.regular}
                color={Colors.BLACK_1}>
                Expectation
              </Text>
              <Text
                fontSize={scale(16)}
                fontFamily={fontFamily.regular}
                color={Colors.BLACK_1}>
                {params?.expectation}
              </Text>
            </HStack>
            <Text
              fontSize={scale(16)}
              fontFamily={fontFamily.regular}
              color={Colors.BLACK_1}>
              Address: {params?.streetAddress}
            </Text>
          </VStack>
        </VStack>
      </ScrollView>
      <Center px="4" pt="2" pb="8">
        <CustomButton
          title="List project"
          onPress={listProjectOnPress}
          height={verticalScale(45)}
        />
      </Center>
      <QuestionModal
        visible={questionModalVisible}
        onClose={onCloseQuestionModal}
        title="Congratulations, your project has been listed"
        option1="Take me to my Project"
        option2="Take me to my HUDU"
        option1OnPress={option1OnPress}
        option2OnPress={option2OnPress}
      />
    </CustomContainer>
  );
};

export default PreviewPostScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});