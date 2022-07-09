import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {HStack, Center, Box, Flex} from 'native-base';
import {scale} from '~/utils/style';
import {Colors} from '~/styles';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  SectionSort,
  SectionHudurProjectRow,
  CustomContainer,
  EmptyData,
} from '~/components';
import {useGetBids} from '~/hooks/bid';
import {authStore, userDataStore} from '~/stores';
import {requestLocationPermission} from '~/utils/getPermissions';
import {showMessage} from 'react-native-flash-message';
import Geolocation from 'react-native-geolocation-service';

const schema = yup.object().shape({
  sort: yup.string(),
});

const SectionHuduUrProjects = () => {
  const {userData} = userDataStore(state => state);
  const {isUserLoggedIn} = authStore(state => state);

  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const {register, watch, setValue} = methods;

  const sort = watch('sort');

  const [options, setOptions] = useState({
    projectFilter: 'NEWEST_TO_OLDEST',
    location: [12, 12],
    where: isUserLoggedIn ? {huduId: {eq: userData?.id}} : {},
  });
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 12,
    longitude: 12,
  });

  useEffect(() => {
    setValue('sort', undefined);
  }, [isUserLoggedIn]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    if (await requestLocationPermission()) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setCurrentLocation({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.091,
          });
        },
        (error: any) => {
          showMessage({
            message: JSON.stringify(error),
            type: 'danger',
            icon: 'danger',
          });
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  useEffect(() => {
    if (sort) {
      setOptions({
        projectFilter: sort,
        location: [currentLocation?.longitude, currentLocation?.latitude],
        where: {huduId: {eq: userData?.id}},
      });
    }
  }, [sort]);

  const {
    isLoading: getBidsLoading,
    data: getBids,
    fetchNextPage: fetchNextPageGetBids,
    hasNextPage: hasNextPageGetBids,
    isRefetching,
    refetch,
  } = useGetBids(options);

  const projects = getBids?.pages ?? [];

  const onLoadMore = () => {
    if (hasNextPageGetBids) {
      fetchNextPageGetBids();
    }
  };

  const loading = getBidsLoading;

  const renderItem = ({item}: {item: any}) => (
    <SectionHudurProjectRow {...{item}} />
  );

  const ItemSeparatorComponent = () => <Box h="3" />;

  return (
    <Flex py="4" h="100%" bg={Colors.WHITE}>
      <CustomContainer isLoading={loading}>
        <Flex flex={1} bg={Colors.WHITE}>
          <FormProvider {...methods}>
            <HStack px="4" justifyContent="flex-end" mb="2">
              <Box flex={1} />
              <Center w={scale(120)}>
                <SectionSort {...register('sort')} />
              </Center>
            </HStack>
          </FormProvider>
          <FlatList
            onRefresh={refetch}
            refreshing={isRefetching}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
            data={projects}
            renderItem={renderItem}
            ListEmptyComponent={EmptyData}
            ItemSeparatorComponent={ItemSeparatorComponent}
            keyExtractor={(_, index) => `key${index}`}
            onEndReachedThreshold={0.5}
            onEndReached={({distanceFromEnd}) => {
              if (distanceFromEnd < 0) return;
              onLoadMore();
            }}
          />
        </Flex>
      </CustomContainer>
    </Flex>
  );
};

export default React.memo(SectionHuduUrProjects);

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: scale(12),
  },
});
