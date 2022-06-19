import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Center, HStack, Text, VStack} from 'native-base';
import {Colors} from '~/styles';
import {navigate} from '~/navigation/Methods';
import {fontFamily, scale} from '~/utils/style';
import {CustomButton, CustomImage, RatingStar} from '~/components';
import {userDataStore} from '~/stores';

const ActiveBidItem = ({item, index}: {item?: any; index: number}) => {
  const {userData} = userDataStore(state => state);
  const totalReview = useMemo(() => {
    const listerCounts = item?.hudu?.listersWhoRatedToMeCount;
    const hudurCounts = item?.hudu?.huduersWhoRatedToMeCount;
    const reviews = Number(listerCounts) + Number(hudurCounts);
    return reviews ? reviews : 0;
  }, [item]);

  const currentUser = userData?.id === item?.huduId;

  const onPressHandler = () => {
    navigate('HudurProfile');
  };

  const cancelOnPress = () => {};

  return (
    <Center
      mt={index === 0 ? '6' : '2'}
      mb="2"
      mx="4"
      px="4"
      py="4"
      borderRadius="lg"
      bg={Colors.WHITE}
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
              {currentUser ? 'you' : item?.hudu?.userName}
            </Text>
            <VStack alignItems="center">
              <RatingStar
                size={14}
                rate={item?.rating}
                showRating="right"
                total={totalReview}
                disabled
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
              {item?.note}
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
              color={Colors.PRIMARY}>
              $ {item?.amount}
            </Text>
          </HStack>
          {currentUser && (
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
