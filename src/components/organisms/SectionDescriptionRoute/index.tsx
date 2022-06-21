import React, {
  useState,
  forwardRef,
  useCallback,
  memo,
  useMemo,
  createRef,
} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {Box, HStack, Text, VStack} from 'native-base';
import Animated from 'react-native-reanimated';
import dayjs from 'dayjs';
import {Colors} from '~/styles';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {CustomButton, EditModal} from '~/components';
import {LocationIcon, MarkerIcon} from '~/assets/icons';
import {useAddBid} from '~/hooks/bid';
import {authStore, userDataStore} from '~/stores';
import {navigate} from '~/navigation/Methods';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
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
    const {isUserLoggedIn} = authStore(state => state);
    const {userData} = userDataStore(state => state);

    const mapRef = createRef<MapView>();

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
      const input = {
        description: formData?.description,
        projectId: data?.id,
        amount: formData?.amount,
      };
      mutateAddBid(input, {
        onSuccess: () => {
          setEditModalVisible(false);
        },
        onError: () => {
          setEditModalVisible(false);
        },
      });
    };

    const submitBidOnPress = () => {
      if (isUserLoggedIn) {
        setEditModalVisible(true);
      } else {
        navigate('AuthStack');
      }
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
          <Box overflow="hidden" w="100%" borderRadius="lg">
            <MapView
              region={{
                latitude: data?.latitude ?? 40.7128,
                longitude: data?.longitude ?? 74.006,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              showsMyLocationButton={false}
              showsUserLocation
              zoomEnabled
              scrollEnabled
              showsScale>
              <Marker
                coordinate={{
                  latitude: data?.latitude ?? 40.7128,
                  longitude: data?.longitude ?? 74.006,
                }}>
                <MarkerIcon />
              </Marker>
            </MapView>
          </Box>
          {userData?.id !== data?.userId && (
            <CustomButton
              onPress={submitBidOnPress}
              title="Submit bid"
              height={verticalScale(45)}
            />
          )}
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
  map: {
    // ...StyleSheet.absoluteFillObject,
    height: verticalScale(130),
    borderRadius: 12,
    width: '100%',
    flex: 1,
  },
});
