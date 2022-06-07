import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {VStack, Text, HStack, Box} from 'native-base';
import {
  ModalContainer,
  CustomButton,
  RatingStar,
  ModalHeader,
  CustomImage,
} from '~/components';
import {scale, fontFamily, verticalScale} from '~/utils/style';
import {Colors} from '~/styles';

const ChooseHudurModal = ({
  visible,
  onClose,
  onSubmit,
  title,
  data,
}: {
  visible: boolean;
  onClose: any;
  onSubmit: any;
  title: string;
  data?: any;
}) => {
  const onCloseHandler = () => {
    onClose?.();
  };

  const awardOnPress = (item: any) => {
    onClose?.();
  };

  const rejectOnPress = (item: any) => {
    onClose?.();
  };

  return (
    <ModalContainer
      isVisible={visible}
      onClose={onCloseHandler}
      style={styles.modal}>
      <VStack bg={Colors.WHITE} py="4" space="4" borderRadius="md">
        <Box px="2">
          <ModalHeader text={title} onPress={onCloseHandler} />
        </Box>
        <VStack bg={Colors.WHITE} w="100%">
          <ScrollView showsVerticalScrollIndicator={false}>
            {data.map((item: any, index: number) => {
              return (
                <VStack
                  key={index + 2}
                  borderRadius="md"
                  shadow="1"
                  p="4"
                  mx="2"
                  mb="4"
                  space="2">
                  <HStack alignItems="center" justifyContent="space-between">
                    <HStack alignItems="center" space="2">
                      <CustomImage
                        local
                        imageSource={item?.image}
                        style={styles.avatar}
                        resizeMode="stretch"
                      />
                      <Text
                        fontSize={scale(16)}
                        fontFamily={fontFamily.medium}
                        color={Colors.BLACK_1}>
                        {item?.name}
                      </Text>
                    </HStack>
                    <VStack alignItems="center">
                      <RatingStar
                        showRating="left"
                        size={scale(10)}
                        rate={item?.rate}
                        disabled
                      />
                      <Text
                        fontSize={scale(8)}
                        fontFamily={fontFamily.regular}
                        color={
                          Colors.BLACK_1
                        }>{`(${item?.totalReview} review)`}</Text>
                    </VStack>
                  </HStack>
                  <HStack space="2">
                    <Text
                      fontSize={scale(14)}
                      fontFamily={fontFamily.regular}
                      color={Colors.BLACK_1}>
                      Note:
                    </Text>
                    <Text
                      flex={1}
                      fontSize={scale(14)}
                      fontFamily={fontFamily.regular}
                      color={Colors.PLACEHOLDER}>
                      {item?.description}
                    </Text>
                  </HStack>
                  <HStack alignItems="center" justifyContent="space-between">
                    <Text
                      fontSize={scale(14)}
                      fontFamily={fontFamily.regular}
                      color={Colors.BLACK_1}>
                      Bid amount
                    </Text>
                    <Text
                      fontSize={scale(14)}
                      fontFamily={fontFamily.regular}
                      color={Colors.INFO}>
                      $ {item?.bidAmount}
                    </Text>
                  </HStack>
                  <HStack alignItems="center" space="4">
                    <Box flex={1}>
                      <CustomButton
                        title="Award"
                        onPress={() => awardOnPress(item)}
                        height={verticalScale(30)}
                      />
                    </Box>
                    <Box flex={1}>
                      <CustomButton
                        outline
                        color={Colors.BLACK_3}
                        title="Reject"
                        onPress={() => rejectOnPress(item)}
                        height={verticalScale(30)}
                      />
                    </Box>
                  </HStack>
                </VStack>
              );
            })}
          </ScrollView>
        </VStack>
      </VStack>
    </ModalContainer>
  );
};

export default ChooseHudurModal;

const styles = StyleSheet.create({
  modal: {
    borderRadius: 8,
    margin: scale(16),
    overflow: 'hidden',
  },
  avatar: {
    height: scale(36),
    width: scale(36),
    borderRadius: 100,
  },
});
