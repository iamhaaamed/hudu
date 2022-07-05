import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Center, HStack, Text, VStack} from 'native-base';
import {Colors} from '~/styles';
import {navigate} from '~/navigation/Methods';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {
  CustomButton,
  CustomImage,
  RatingStar,
  QuestionModal,
} from '~/components';
import {userDataStore} from '~/stores';
import {useAcceptBid, useCancelBid, useRejectBid} from '~/hooks/bid';
import images from '~/assets/images';
import {ResponseStatus} from '~/generated/graphql';

const ActiveBidItem = ({
  item,
  index,
  projectStatus,
}: {
  item?: any;
  index: number;
  projectStatus: string;
}) => {
  const {userData} = userDataStore(state => state);
  const {mutate: mutateCancelBid, isLoading: cancelBidLoading} = useCancelBid();
  const {mutate: mutateRejectBid, isLoading: rejectBidLoading} = useRejectBid();
  const {mutate: mutateAcceptBid, isLoading: acceptBidLoading} = useAcceptBid();

  const [cancelBidModalVisible, setCancelBidModalVisible] =
    useState<boolean>(false);
  const [awardModalVisible, setAwardModalVisible] = useState<boolean>(false);
  const [rejectModalVisible, setRejectModalVisible] = useState<boolean>(false);

  const totalReview = useMemo(() => {
    const listerCounts = item?.hudu?.listersWhoRatedToMeCount;
    const hudurCounts = item?.hudu?.huduersWhoRatedToMeCount;
    const reviews = Number(listerCounts) + Number(hudurCounts);
    return reviews ? reviews : 0;
  }, [item]);

  const currentUser = userData?.id === item?.huduId;
  const isLister = userData?.id === item?.listerId;

  const onPressHandler = () => {
    navigate('HudurProfile', {userId: item?.huduId});
  };

  const cancelOnPress = () => {
    setCancelBidModalVisible(true);
  };

  const onCloseCancelBidModal = () => {
    setCancelBidModalVisible(false);
  };

  const onCloseAwardModal = () => {
    setAwardModalVisible(false);
  };

  const onCloseRejectModal = () => {
    setRejectModalVisible(false);
  };

  const onAcceptCancelBidModal = async () => {
    mutateCancelBid(item?.id, {
      onSuccess: successData => {
        if (successData?.bid_cancellBid?.status === ResponseStatus.Success) {
          setCancelBidModalVisible(false);
        }
      },
    });
  };

  const onAcceptAwardModal = async () => {
    mutateAcceptBid(item?.id, {
      onSuccess: successData => {
        if (successData?.bid_acceptBid?.status === ResponseStatus.Success) {
          setAwardModalVisible(false);
        }
      },
    });
  };

  const onAcceptRejectModal = async () => {
    mutateRejectBid(item?.id, {
      onSuccess: successData => {
        if (successData?.bid_rejectBid?.status === ResponseStatus.Success) {
          setRejectModalVisible(false);
        }
      },
    });
  };

  const awardOnPress = () => {
    setAwardModalVisible(true);
  };

  const rejectOnPress = () => {
    setRejectModalVisible(true);
  };

  const isCancelled = item?.bidStatus === 'CANCELL';
  const isNotLucky = item?.bidStatus === 'NOT_LUCKY';
  const inProgress = item?.bidStatus === 'IN_PROGRESS';
  const isFinished = projectStatus === 'FINISHED';
  const isBidding = projectStatus === 'BIDDING';

  return (
    <>
      <Center
        mt={index === 0 ? '6' : '2'}
        mb="2"
        mx="4"
        px="4"
        py="4"
        borderRadius="lg"
        bg={
          isCancelled || isNotLucky
            ? Colors.CANCEL_CARD_BACKGROUND
            : inProgress || isFinished || isBidding
            ? Colors.WHITE
            : Colors.CANCEL_CARD_BACKGROUND
        }
        shadow="2">
        <TouchableOpacity
          disabled={isCancelled || isNotLucky || (!inProgress && !isFinished)}
          activeOpacity={0.7}
          style={styles.item}
          onPress={onPressHandler}>
          <VStack space="2">
            <HStack space="2" alignItems="center">
              <CustomImage
                imageSource={item?.hudu?.imageAddress}
                resizeMode="stretch"
                style={styles.avatar}
                errorImage={images.avatarErrorImage}
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
                  fillColor={
                    isCancelled || isNotLucky
                      ? Colors.PLACEHOLDER
                      : inProgress || isFinished
                      ? Colors.GOLDEN
                      : Colors.CANCEL_CARD_BACKGROUND
                  }
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
                color={
                  isCancelled || isNotLucky
                    ? Colors.PLACEHOLDER
                    : inProgress || isFinished
                    ? Colors.PRIMARY
                    : Colors.PLACEHOLDER
                }>
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
            {item?.bidStatus === 'WAITING' &&
              isLister &&
              projectStatus === 'BIDDING' && (
                <HStack space="4">
                  <Center flex={1}>
                    <CustomButton
                      title="Award"
                      onPress={awardOnPress}
                      height={verticalScale(35)}
                    />
                  </Center>
                  <Center flex={1}>
                    <CustomButton
                      color={Colors.BLACK_3}
                      outline
                      title="Reject"
                      onPress={rejectOnPress}
                      height={verticalScale(35)}
                    />
                  </Center>
                </HStack>
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
      <QuestionModal
        visible={awardModalVisible}
        onClose={onCloseAwardModal}
        title="Are you sur you want award this bid?"
        option1="No"
        option2="Yes"
        option1OnPress={onCloseAwardModal}
        option2OnPress={onAcceptAwardModal}
        loading={acceptBidLoading}
      />
      <QuestionModal
        visible={rejectModalVisible}
        onClose={onCloseRejectModal}
        title="Are you sur you want reject this bid?"
        option1="No"
        option2="Yes"
        option1OnPress={onCloseRejectModal}
        option2OnPress={onAcceptRejectModal}
        loading={rejectBidLoading}
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
