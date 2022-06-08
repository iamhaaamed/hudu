import dayjs from 'dayjs';
import React from 'react';
import {Colors} from '~/styles';
import images from '~/assets/images';
import {StyleSheet} from 'react-native';
import {CustomImage} from '~/components';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import {HStack, Text, VStack, Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import CustomButton from '~/components/atoms/CustomButton';

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

const SectionDescriptionRouteLister = ({data}: any) => {
  return (
    <VStack px="4" pt={4} pb={6} space="3">
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
          color={Colors.PRIMARY}
          fontFamily={fontFamily.regular}>
          {dayjs('2022-06-07 11:25').toNow(true)}
        </Text>
      </HStack>
      <CustomImage
        local
        resizeMode="stretch"
        style={styles.image}
        imageSource={images.mapImage}
      />
      <CustomButton title="Submit Bid" onPress={() => {}} />
    </VStack>
  );
};

export default SectionDescriptionRouteLister;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    borderRadius: 12,
    height: verticalScale(130),
  },
});
