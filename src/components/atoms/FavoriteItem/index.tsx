import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Box, VStack, HStack} from 'native-base';
import {Colors} from '~/styles';
import {CustomImage, FavoriteIcon} from '~/components';
import {fontFamily, scale, verticalScale} from '~/utils/style';

const FavoriteItem = ({item}: {item?: any}) => {
  const lowBid = useMemo(() => {
    let res = -1;
    if (item?.project?.bids?.length > 0) {
      res = Math.min.apply(
        Math,
        item?.project?.bids?.map(function (object: any) {
          return object?.amount;
        }),
      );
    }
    return res;
  }, [item]);

  const onPressHandler = () => {};

  return (
    <Box
      mb="4"
      w="48%"
      h={verticalScale(268)}
      shadow="4"
      borderRadius="md"
      bg={Colors.WHITE}>
      <CustomImage
        local
        imageSource={item?.imageAddress}
        style={styles.image}
        resizeMode="stretch">
        <VStack flex={1} justifyContent="space-between">
          <HStack w="100%" px="2" py="2">
            <FavoriteIcon
              {...{isLiked: item?.isLiked, projectId: item?.project?.id}}
            />
          </HStack>
          <HStack alignItems="center" w="100%" h={verticalScale(24)}>
            <Box
              w="100%"
              h="100%"
              position="absolute"
              bg={Colors.BLACK_1}
              opacity={0.75}
            />
            <Text
              mx="2"
              zIndex={10}
              color={Colors.WHITE}
              fontSize={scale(11)}
              fontFamily={fontFamily.medium}>
              Time left: {item?.timeLeft}
            </Text>
          </HStack>
        </VStack>
      </CustomImage>
      <TouchableOpacity
        style={styles.flex1}
        activeOpacity={0.7}
        onPress={onPressHandler}>
        <VStack py="2" px="2" space="2" flex={1}>
          <Text
            fontSize={scale(14)}
            fontFamily={fontFamily.bold}
            numberOfLines={1}>
            {item?.project?.title}
          </Text>
          <Text
            fontSize={scale(11)}
            fontFamily={fontFamily.regular}
            numberOfLines={3}
            color={Colors.PLACEHOLDER}>
            {item?.project?.description}
          </Text>
        </VStack>
        <HStack pb="2" px="2" justifyContent="space-between">
          <Text
            fontSize={scale(11)}
            fontFamily={fontFamily.regular}
            numberOfLines={1}
            color={Colors.BLACK_1}>
            {item?.project?.bids?.length > 0 && lowBid !== -1
              ? 'Current low bid'
              : 'Be the first bidder'}
          </Text>
          {item?.project?.bids?.length > 0 && lowBid !== -1 && (
            <Text
              fontSize={scale(11)}
              fontFamily={fontFamily.regular}
              color={Colors.INFO}
              numberOfLines={1}>
              $ {lowBid}
            </Text>
          )}
        </HStack>
      </TouchableOpacity>
    </Box>
  );
};

export default FavoriteItem;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: verticalScale(126),
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    overflow: 'hidden',
  },
  flex1: {
    flex: 1,
  },
});
