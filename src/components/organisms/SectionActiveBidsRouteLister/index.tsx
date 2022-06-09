import React, {forwardRef, useCallback, memo} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Center, HStack, Text, VStack} from 'native-base';
import Animated from 'react-native-reanimated';
import {Colors} from '~/styles';
import {navigate} from '~/navigation/Methods';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {CustomButton, CustomImage, RatingStar} from '~/components';

export const AnimatedFlatList: typeof FlatList =
  Animated.createAnimatedComponent(FlatList);

const SectionActiveBidsRouteLister = forwardRef(
  (
    {
      data,
      contentContainerStyle,
      onMomentumScrollEnd,
      onScrollEndDrag,
      scrollEventThrottle,
      scrollIndicatorInsets,
      onScroll,
    }: any,
    ref,
  ) => {
    const awardOnPress = () => {};

    const rejectOnPress = () => {};

    const itemOnPress = () => {
      navigate('HudurProfileLister');
    };

    const keyExtractor = useCallback((_, index: number) => `key${index}`, []);

    const renderItem = ({item, index}: {item: any; index: number}) => {
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
            onPress={itemOnPress}>
            <VStack space="2">
              <HStack space="2" alignItems="center">
                <CustomImage
                  local
                  imageSource={item?.image}
                  resizeMode="stretch"
                  style={styles.avatar}
                />
                <Text
                  flex={1}
                  fontSize={scale(14)}
                  fontFamily={fontFamily.medium}
                  color={Colors.BLACK_1}>
                  {item?.name}
                </Text>
                <VStack alignItems="center">
                  <RatingStar
                    size={14}
                    rate={item?.rating}
                    showRating="left"
                    disabled
                  />
                  <Text
                    fontSize={scale(10)}
                    fontFamily={fontFamily.regular}
                    color={
                      Colors.PLACEHOLDER
                    }>{`(${item?.totalReviews} review)`}</Text>
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
                  Your bid
                </Text>
                <Text
                  fontSize={scale(14)}
                  fontFamily={fontFamily.regular}
                  color={Colors.PRIMARY}>
                  $ {item?.bidAmount}
                </Text>
              </HStack>
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
            </VStack>
          </TouchableOpacity>
        </Center>
      );
    };

    return (
      <AnimatedFlatList
        ref={ref}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        {...{
          data,
          onScroll,
          contentContainerStyle,
          onMomentumScrollEnd,
          onScrollEndDrag,
          scrollEventThrottle,
          scrollIndicatorInsets,
        }}
        showsVerticalScrollIndicator={false}
      />
    );
  },
);

export default memo(SectionActiveBidsRouteLister);

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
