import React, {
  useState,
  forwardRef,
  useCallback,
  memo,
  useMemo,
  createRef,
  useEffect,
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
import {useAddBid, useGetBids} from '~/hooks/bid';
import {authStore, userDataStore} from '~/stores';
import {navigate} from '~/navigation/Methods';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {getLocationFromState, getStateNameFromShortName} from '~/utils/helper';
import {useGetLocation} from '~/hooks/location';
import {Config} from 'react-native-config';
//import MapViewDirections from 'react-native-maps-directions';
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

    const [zipCodeLocation, setZipCodeLocation] = useState({});
    const [locationData, setLocationData] = useState();
    const getBidsOption = {
      where: {
        and: [
          {projectId: {eq: data?.id}},
          {huduId: {eq: userData?.id}},
          {bidStatus: {eq: 'IN_PROGRESS'}},
        ],
      },
    };
    const {mutate: mutateAddBid, isLoading: addBidLoading} = useAddBid();
    const {mutate: getLocationMutate, isLoading: getLocationLoading} =
      useGetLocation();
    const {isLoading: getBidsLoading, data: getBids} =
      useGetBids(getBidsOption);

    const bids = getBids?.pages ?? [];

    useEffect(() => {
      if (data?.zipCode) {
        getLocationMutate(data?.zipCode, {
          onSuccess: (success: any) => {
            if (success?.status === 1) {
              const lat = parseFloat(success?.output?.[0]?.latitude);
              const long = parseFloat(success?.output?.[0]?.longitude);
              setZipCodeLocation({
                Latitude: lat,
                Longitude: long,
              });
            }
          },
        });
      }
    }, [data]);

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

    const projectDeadLine = dayjs().diff(data?.projectDeadLine, 'day');

    useEffect(() => {
      if (userData?.id === data?.userId || bids?.length > 0) {
        setLocationData(zipCodeLocation);
      } else {
        const locationItem = getLocationFromState(data?.state);
        setLocationData(locationItem);
      }
    }, [data, zipCodeLocation]);

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
                : 'Be the first one to bid'}
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
              {`${projectDeadLine} Days`}
            </Text>
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <HStack alignItems="center" space="1">
              <LocationIcon />
              <Text
                fontSize={scale(16)}
                fontFamily={fontFamily.regular}
                color={Colors.PRIMARY}>
                {getStateNameFromShortName(data?.state) !== -1
                  ? getStateNameFromShortName(data?.state)
                  : ''}
                , {data?.city}
                {userData?.id === data?.userId || bids?.length > 0
                  ? `, ${data?.streetAddress}`
                  : ''}
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
            {locationData?.Latitude && locationData?.Longitude && (
              <MapView
                showsScale
                zoomEnabled
                ref={mapRef}
                scrollEnabled
                style={styles.map}
                showsUserLocation={false}
                // provider={PROVIDER_GOOGLE}
                showsMyLocationButton={false}
                region={{
                  latitude: locationData?.Latitude,
                  longitude: locationData?.Longitude,
                  latitudeDelta: 0.99,
                  longitudeDelta: 0.99,
                }}
                onRegionChange={e => {
                  const coordinate = e;
                  setLocationData({
                    Latitude: coordinate?.latitude,
                    Longitude: coordinate?.longitude,
                  });
                }}>
                {/* <MapViewDirections
              origin={{
                latitude: locationData?.Latitude || 40.7128,
                longitude: locationData?.Longitude || 74.006,
                // latitudeDelta: 0.99,
                // longitudeDelta: 0.99,
              }}
              destination={{
                latitude: 35.0078,
                longitude: 97.0929,
              }}
              apikey={Config.GOOGLE_MAPS_API_KEY}
              onError={error => {
                console.log({error});
              }}
            /> */}
                <Marker
                  coordinate={{
                    latitude: locationData?.Latitude,
                    longitude: locationData?.Longitude,
                  }}>
                  <MarkerIcon />
                </Marker>
              </MapView>
            )}
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
    height: verticalScale(190),
    borderRadius: 12,
    width: '100%',
    flex: 1,
  },
});
