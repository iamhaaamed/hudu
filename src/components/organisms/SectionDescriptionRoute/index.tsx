import React, {useState, forwardRef, useCallback, memo, useMemo} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {HStack, Text, VStack} from 'native-base';
import Animated from 'react-native-reanimated';
import dayjs from 'dayjs';
import {Colors} from '~/styles';
import images from '~/assets/images';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {CustomButton, CustomImage, EditModal} from '~/components';
import {LocationIcon} from '~/assets/icons';
import {useAddBid} from '~/hooks/bid';
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

const SectionDescriptionRoute = forwardRef(
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
    const {mutate: mutateAddBid, isLoading: addBidLoading} = useAddBid();

    const lowBid = useMemo(() => {
      let res = -1;
      if (data?.bids?.length > 0) {
        res = Math.min.apply(
          Math,
          data?.bids?.map(function (object: any) {
            return object?.amount;
          }),
        );
      }
      return res;
    }, []);

    const [editModalVisible, setEditModalVisible] = useState(false);

    const closeEditModal = () => {
      setEditModalVisible(false);
    };

    const submitEditModal = (formData: any) => {
      console.log({formData});
      // mutateAddBid(
      //   {},
      //   {
      //     onSuccess: (successData: any) => {},
      //     onError: (errorData: any) => {},
      //   },
      // );
      //setEditModalVisible(false);
    };

    const submitBidOnPress = () => {
      setEditModalVisible(true);
    };

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
              {data?.bids?.length > 0 && lowBid !== -1
                ? 'Current low bid'
                : 'Be the first bidder'}
            </Text>
            {data?.bids?.length > 0 && lowBid !== -1 && (
              <Text
                fontSize={scale(16)}
                fontFamily={fontFamily.regular}
                color={Colors.PRIMARY}>
                ${lowBid}
              </Text>
            )}
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
              <LocationIcon />
              <Text
                fontSize={scale(16)}
                fontFamily={fontFamily.regular}
                color={Colors.PRIMARY}>
                {data?.state}, {data?.city}
              </Text>
            </HStack>
            <Text
              fontSize={scale(16)}
              fontFamily={fontFamily.regular}
              color={Colors.BLACK_3}>
              {'12 minutes'}
            </Text>
          </HStack>
          <CustomImage
            local
            imageSource={images.mapImage}
            resizeMode="stretch"
            style={styles.image}
          />
          <CustomButton
            onPress={submitBidOnPress}
            title="Submit bid"
            height={verticalScale(45)}
          />
        </VStack>
      ),
      [data],
    );

    const renderItem = () => <></>;

    return (
      <>
        <AnimatedFlatList
          ref={ref}
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
        <EditModal
          visible={editModalVisible}
          onClose={closeEditModal}
          onSubmit={submitEditModal}
          title="Bid details"
          loading={addBidLoading}
        />
      </>
    );
  },
);

export default memo(SectionDescriptionRoute);

const styles = StyleSheet.create({
  image: {
    width: '100%',
    borderRadius: 12,
    height: verticalScale(130),
  },
});
