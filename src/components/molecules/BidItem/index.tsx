import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {VStack, Text, HStack, Box} from 'native-base';
import {CustomButton, RatingStar, CustomImage} from '~/components';
import {scale, fontFamily, verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import {useAcceptBid, useRejectBid} from '~/hooks/bid';
import images from '~/assets/images';

const BidItem = ({item}: {item?: any}) => {
  const {mutate: mutateAcceptBid, isLoading: acceptBidLoading} = useAcceptBid();
  const {mutate: mutateRejectBid, isLoading: rejectBidLoading} = useRejectBid();

  const totalReview = useMemo(() => {
    const listerCounts = item?.hudu?.listersWhoRatedToMeCount;
    const hudurCounts = item?.hudu?.huduersWhoRatedToMeCount;
    const reviews = Number(listerCounts) + Number(hudurCounts);
    return reviews ? reviews : 0;
  }, [item]);

  const awardOnPress = () => {
    mutateAcceptBid(item?.id, {
      onSuccess: () => {},
      onError: () => {},
    });
  };

  const rejectOnPress = () => {
    mutateRejectBid(item?.id, {
      onSuccess: () => {},
      onError: () => {},
    });
  };

  return (
    <VStack borderRadius="md" shadow="3" p="4" mx="2" mb="4" space="2">
      <HStack alignItems="center" justifyContent="space-between">
        <HStack alignItems="center" space="2">
          <CustomImage
            imageSource={item?.hudu?.imageAddress}
            style={styles.avatar}
            resizeMode="stretch"
            errorImage={images.avatarErrorImage}
          />
          <Text
            fontSize={scale(16)}
            fontFamily={fontFamily.medium}
            color={Colors.BLACK_1}>
            {item?.hudu?.userName ?? 'Hudur'}
          </Text>
        </HStack>
        <VStack alignItems="center">
          <RatingStar
            showRating="left"
            size={scale(10)}
            rate={item?.hudu?.averageRate}
            disabled
            total={totalReview}
          />
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
          $ {item?.amount}
        </Text>
      </HStack>
      <HStack alignItems="center" space="4">
        <Box flex={1}>
          <CustomButton
            title="Award"
            onPress={awardOnPress}
            height={verticalScale(30)}
            loading={acceptBidLoading}
          />
        </Box>
        <Box flex={1}>
          <CustomButton
            outline
            color={Colors.BLACK_3}
            title="Reject"
            onPress={rejectOnPress}
            height={verticalScale(30)}
            loading={rejectBidLoading}
            spinnerColor={Colors.BLACK_3}
          />
        </Box>
      </HStack>
    </VStack>
  );
};

export default BidItem;

const styles = StyleSheet.create({
  avatar: {
    height: scale(36),
    width: scale(36),
    borderRadius: 100,
  },
});
