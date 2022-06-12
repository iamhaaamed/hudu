import React, {forwardRef, useCallback, memo} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {HStack, Icon, Text, VStack} from 'native-base';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import {Colors} from '~/styles';
import images from '~/assets/images';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {CustomImage} from '~/components';
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s Ago',
    s: 'A Few Seconds',
    m: 'A Minute',
    mm: '%d Minutes',
    h: 'An Hour',
    hh: '%d Hours',
    d: 'A Day',
    dd: '%d Days',
    M: 'A Month',
    MM: '%d Months',
    y: 'A Year',
    yy: '%d Years',
  },
});

export const AnimatedFlatList: typeof FlatList =
  Animated.createAnimatedComponent(FlatList);

const SectionDescriptionRouteLister = forwardRef(
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
    const keyExtractor = useCallback((_, index: number) => `key${index}`, []);

    const ListHeaderComponent = useCallback(
      () => (
        <VStack pt="6" px="4" space="3">
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
              Current low bid
            </Text>
            <Text
              fontSize={scale(16)}
              fontFamily={fontFamily.regular}
              color={Colors.PRIMARY}>
              ${data?.lowBid}
            </Text>
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <Text
              fontSize={scale(16)}
              fontFamily={fontFamily.regular}
              color={Colors.BLACK_1}>
              Time left
            </Text>
            <Text
              fontSize={scale(16)}
              fontFamily={fontFamily.regular}
              color={Colors.BLACK_3}>
              {dayjs('2022-01-01').toNow(true)}
            </Text>
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <HStack alignItems="center" space="1">
              <Icon
                as={<Ionicons name="location-outline" />}
                color={Colors.PRIMARY}
                size={scale(16)}
              />
              <Text
                fontSize={scale(16)}
                fontFamily={fontFamily.regular}
                color={Colors.PRIMARY}>
                {data?.location}
              </Text>
            </HStack>
            <Text
              fontSize={scale(16)}
              fontFamily={fontFamily.regular}
              color={Colors.BLACK_3}>
              {dayjs('2022-06-07 11:25').toNow(true)}
            </Text>
          </HStack>
          <CustomImage
            local
            imageSource={images.mapImage}
            resizeMode="stretch"
            style={styles.image}
          />
        </VStack>
      ),
      [],
    );

    const renderItem = () => <></>;

    return (
      <AnimatedFlatList
        ref={ref}
        style={styles.container}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        data={[]}
        {...{
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

export default memo(SectionDescriptionRouteLister);

const styles = StyleSheet.create({
  image: {
    width: '100%',
    borderRadius: 12,
    height: verticalScale(130),
  },
});
