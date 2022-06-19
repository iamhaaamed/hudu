import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Center, HStack, Text, VStack} from 'native-base';
import {Colors} from '~/styles';
import {navigate} from '~/navigation/Methods';
import {fontFamily, scale} from '~/utils/style';
import {
  CustomButton,
  CustomImage,
  RatingStar,
  QuestionModal,
} from '~/components';
import {userDataStore} from '~/stores';
import {useCancelBid} from '~/hooks/bid';

const ActiveBidItem = ({item, index}: {item?: any; index: number}) => {
  const {userData} = userDataStore(state => state);
  const {mutate: mutateCancelBid, isLoading: cancelBidLoading} = useCancelBid();

  const [cancelBidModalVisible, setCancelBidModalVisible] =
    useState<boolean>(false);

  const totalReview = useMemo(() => {
    const listerCounts = item?.hudu?.listersWhoRatedToMeCount;
    const hudurCounts = item?.hudu?.huduersWhoRatedToMeCount;
    const reviews = Number(listerCounts) + Number(hudurCounts);
    return reviews ? reviews : 0;
  }, [item]);

  const currentUser = userData?.id === item?.huduId;

  const onPressHandler = () => {
    navigate('HudurProfile', {userId: item?.huduId});
  };

  console.log({item});

  const cancelOnPress = () => {
    setCancelBidModalVisible(true);
  };

  const onCloseCancelBidModal = () => {
    setCancelBidModalVisible(false);
  };

  const onAcceptCancelBidModal = async () => {
    mutateCancelBid(item?.id, {
      onSuccess: () => {
        setCancelBidModalVisible(false);
      },
      onError: () => {
        setCancelBidModalVisible(false);
      },
    });
  };

  const isCancelled = item?.bidStatus === 'CANCELL';

  return (
    <>
      <Center
        mt={index === 0 ? '6' : '2'}
        mb="2"
        mx="4"
        px="4"
        py="4"
        borderRadius="lg"
        bg={isCancelled ? Colors.CANCEL_CARD_BACKGROUND : Colors.WHITE}
        shadow="2">
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.item}
          onPress={onPressHandler}>
          <VStack space="2">
            <HStack space="2" alignItems="center">
              <CustomImage
                local
                imageSource={item?.hudu?.image}
                resizeMode="stretch"
                style={styles.avatar}
              />
              <Text
                flex={1}
                fontSize={scale(14)}
                fontFamily={fontFamily.medium}
                color={Colors.BLACK_1}>
                {currentUser ? 'you' : item?.hudu?.userName ?? 'Hudur'}
              </Text>
              <VStack alignItems="center">
                <RatingStar
                  size={14}
                  rate={item?.hudu?.averageRate}
                  showRating="right"
                  total={totalReview}
                  disabled
                  fillColor={isCancelled ? Colors.PLACEHOLDER : Colors.GOLDEN}
                />
              </VStack>
            </HStack>
            <HStack space="2">
              <Text
                fontSize={scale(14)}
                fontFamily={fontFamily.regular}
                color={Colors.BLACK_1}>
                {'Note: '}
              </Text>
              <Text
                flex={1}
                fontSize={scale(14)}
                fontFamily={fontFamily.regular}
                color={Colors.PLACEHOLDER}>
                {item?.description}
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text
                fontSize={scale(14)}
                fontFamily={fontFamily.regular}
                color={Colors.BLACK_1}>
                {currentUser ? 'Your bid' : 'Bid amount'}
              </Text>
              <Text
                fontSize={scale(14)}
                fontFamily={fontFamily.regular}
                color={isCancelled ? Colors.PLACEHOLDER : Colors.PRIMARY}>
                $ {item?.amount}
              </Text>
            </HStack>
            {currentUser && item?.bidStatus === 'WAITING' && (
              <CustomButton
                color={Colors.BLACK_3}
                outline
                title="Cancel"
                onPress={cancelOnPress}
              />
            )}
          </VStack>
        </TouchableOpacity>
      </Center>
      <QuestionModal
        visible={cancelBidModalVisible}
        onClose={onCloseCancelBidModal}
        title="Are you sur you want cancel this bid?"
        option1="No"
        option2="Yes"
        option1OnPress={onCloseCancelBidModal}
        option2OnPress={onAcceptCancelBidModal}
        loading={cancelBidLoading}
      />
    </>
  );
};

export default ActiveBidItem;

const styles = StyleSheet.create({
  avatar: {
    height: scale(33),
    width: scale(33),
    borderRadius: 100,
  },
  item: {
    flex: 1,
    width: '100%',
  },
});
