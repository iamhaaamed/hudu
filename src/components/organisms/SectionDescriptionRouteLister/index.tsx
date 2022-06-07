import React from 'react';
import {Animated, StyleSheet, useWindowDimensions} from 'react-native';
import {HStack, Text, VStack, Icon} from 'native-base';
import {Colors} from '~/styles';
import {
  HEADER_HEIGHT,
  TAB_BAR_HEIGHT,
  OTHER_PADDING,
  TABS_TOP,
} from '~/styles/spacing';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import {CustomImage} from '~/components';
import images from '~/assets/images';
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

const SectionDescriptionRouteLister = ({
  position,
  syncOffset,
  descriptionRef,
  onMomentumScrollBegin,
  data,
}: any) => {
  const {height} = useWindowDimensions();

  const renderItem = () => {
    return (
      <VStack top={-TABS_TOP} px="4" space="3">
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
            color={Colors.PRIMARY}>
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
            color={Colors.PRIMARY}>
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
    );
  };

  return (
    <Animated.FlatList
      showsVerticalScrollIndicator={false}
      ref={descriptionRef}
      scrollEventThrottle={1}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScroll={Animated.event(
        [{nativeEvent: {contentOffset: {y: position}}}],
        {useNativeDriver: true},
      )}
      onMomentumScrollEnd={e => {
        syncOffset('description', e.nativeEvent.contentOffset.y);
      }}
      contentContainerStyle={[
        styles.contentContainerStyle,
        {minHeight: height},
      ]}
      data={['']}
      renderItem={renderItem}
    />
  );
};

export default SectionDescriptionRouteLister;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: HEADER_HEIGHT + TAB_BAR_HEIGHT + OTHER_PADDING,
  },
  image: {
    height: verticalScale(130),
    width: '100%',
    borderRadius: 12,
  },
});
