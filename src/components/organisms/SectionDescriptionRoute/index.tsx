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
import {
  CustomButton,
  EditModal,
  SectionBidAmountLabel,
  TimeLeftLabel,
} from '~/components';
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
    const getBidsOption =
      isUserLoggedIn && data
        ? {
            projectFilter: 'NEWEST_TO_OLDEST',
            location: [12, 12],
            where: {
              and: [
                {projectId: {eq: data?.id}},
                {huduId: {eq: userData?.id}},
                {bidStatus: {eq: 'IN_PROGRESS'}},
              ],
            },
          }
        : {enabled: false};
    const {mutate: mutateAddBid, isLoading: addBidLoading} = useAddBid();
    const {mutate: getLocationMutate, isLoading: getLocationLoading} =
      useGetLocation();
    const {isLoading: getBidsLoading, data: getBids} =
      useGetBids(getBidsOption);

    const bids = getBids?.pages ?? [];

    useEffect(() => {
      if (data?.zipCode) {
        getZipCodeLocation();
      }
    }, [data]);

    const getZipCodeLocation = async () => {
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
    };

    const [editModalVisible, setEditModalVisible] = useState(false);

    const locationData = getLocationFromState(data?.state);

    const location =
      userData?.id === data?.userId && bids?.length > 0
        ? zipCodeLocation
        : locationData;

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

          <SectionBids
            {...{
              projectStatus: data?.projectStatus,
              projectId: data?.id,
              listerId: data?.userId,
            }}
          />
          <TimeLeftLabel
            {...{time: data?.projectDeadLine, type: 'projectDetails'}}
          />
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
            {location && (
              <MapView
                showsScale
                zoomEnabled
                ref={mapRef}
                scrollEnabled
                style={styles.map}
                showsUserLocation={false}
                provider={PROVIDER_GOOGLE}
                showsMyLocationButton={false}
                region={{
                  latitude: location?.Latitude,
                  longitude: location?.Longitude,
                  latitudeDelta: 1.6,
                  longitudeDelta: 1.0,
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
                    latitude: location?.Latitude,
                    longitude: location?.Longitude,
                  }}>
                  <MarkerIcon />
                </Marker>
              </MapView>
            )}
          </Box>
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
        {userData?.id !== data?.userId && data?.projectStatus === 'BIDDING' && (
          <VStack px="4" py="4" bg={Colors.WHITE}>
            <CustomButton
              onPress={submitBidOnPress}
              title="Submit bid"
              height={verticalScale(45)}
            />
          </VStack>
        )}
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

const SectionBids = ({
  projectStatus,
  projectId,
  listerId,
}: {
  projectStatus: string;
  projectId: number;
  listerId: number;
}) => {
  const getBidsOption = {
    projectFilter: 'NEWEST_TO_OLDEST',
    location: [12, 12],
    where: {
      and: [
        {projectId: {eq: projectId}},
        {
          or: [
            {bidStatus: {eq: 'WAITING'}},
            {bidStatus: {eq: 'IN_PROGRESS'}},
            {bidStatus: {eq: 'FINISHED'}},
          ],
        },
      ],
    },
  };

  const {isLoading: getBidsLoading, data: getBids} = useGetBids(getBidsOption);

  const bids = getBids?.pages ?? [];

  const currentBid = useMemo(() => {
    let res = {
      amount: -1,
      id: undefined,
      bidStatus: undefined,
      description: undefined,
    };
    if (projectStatus === 'BIDDING') {
      if (bids?.length > 0) {
        res = bids.reduce(function (prev: any, curr: any) {
          return prev?.amount < curr?.amount ? prev : curr;
        });
      }
    } else {
      res = bids?.find(function (object: any) {
        if (
          object?.bidStatus === 'IN_PROGRESS' ||
          object?.bidStatus === 'FINISHED'
        ) {
          return object;
        }
      });
    }
    return res;
  }, [bids]);

  return (
    <HStack alignItems="center" justifyContent="space-between">
      <SectionBidAmountLabel
        {...{
          currentBid,
          bids: bids,
          listerId,
          projectStatus,
        }}
      />
      {bids?.length > 0 && currentBid?.amount !== -1 && (
        <Text
          fontSize={scale(16)}
          fontFamily={fontFamily.regular}
          color={Colors.PRIMARY}>
          ${currentBid?.amount}
        </Text>
      )}
    </HStack>
  );
};

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
