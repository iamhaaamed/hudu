import React from 'react';
import {StyleSheet, FlatList, ScrollView} from 'react-native';
import {VStack, Center, Text, HStack} from 'native-base';
import {ModalContainer, CustomButton, ImageBoxViewer} from '~/components';
import {scale, fontFamily, verticalScale} from '~/utils/style';
import {Colors} from '~/styles';

const PreviewPostModal = ({
  visible,
  onClose,
  loading,
  data,
  listProjectOnPress,
  editOnPress,
  cancelOnPress,
  availability,
}: {
  visible: boolean;
  onClose: () => void;
  loading: boolean;
  data: any;
  listProjectOnPress: () => void;
  editOnPress: () => void;
  cancelOnPress: () => void;
  availability: any;
}) => {
  const renderItem = ({item, index}: {item: any; index: number}) => (
    <Center ml="4" mr={index === data?.images?.length ? '4' : '0'}>
      <ImageBoxViewer {...{item}} />
    </Center>
  );

  return (
    <ModalContainer
      isVisible={visible}
      onClose={onClose}
      style={styles.modal}
      loading={loading}>
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
            data={data?.projectImages || []}
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
              {data?.title}
            </Text>
            <Text
              fontSize={scale(16)}
              fontFamily={fontFamily.regular}
              color={Colors.PLACEHOLDER}>
              {data?.description}
            </Text>
            <HStack alignItems="center" justifyContent="space-between">
              <Text
                fontSize={scale(16)}
                fontFamily={fontFamily.regular}
                color={Colors.BLACK_1}>
                Availability to complete project
              </Text>
              <Text
                fontSize={scale(16)}
                fontFamily={fontFamily.regular}
                color={Colors.BLACK_1}>
                {availability ?? ''}
              </Text>
            </HStack>
            <Text
              fontSize={scale(16)}
              fontFamily={fontFamily.regular}
              color={Colors.BLACK_1}>
              Address: {data?.streetAddress}
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
    </ModalContainer>
  );
};

export default PreviewPostModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
});
