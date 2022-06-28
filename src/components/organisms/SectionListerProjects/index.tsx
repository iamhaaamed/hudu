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
  SectionListerProjectRow,
  CustomContainer,
  EmptyData,
} from '~/components';
import {useGetProjects} from '~/hooks/project';
import {userDataStore} from '~/stores';
import {requestLocationPermission} from '~/utils/getPermissions';
import {showMessage} from 'react-native-flash-message';
import Geolocation from 'react-native-geolocation-service';

const schema = yup.object().shape({
  sort: yup.string(),
});

const SectionListerProjects = () => {
  const {userData} = userDataStore(state => state);
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const {register, watch} = methods;

  const sort = watch('sort');

  const [options, setOptions] = useState({
    location: [12, 12],
    where: {project: {userId: {eq: userData?.id}}},
  });
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 12,
    longitude: 12,
  });

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    if (await requestLocationPermission()) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
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
        location: [currentLocation?.latitude, currentLocation?.longitude],
        where: {project: {userId: {eq: userData?.id}}},
      });
    }
  }, [sort]);

  const {
    isLoading: getProjectLoading,
    data: getProjects,
    fetchNextPage: fetchNextPageProjects,
    hasNextPage: hasNextPageProjects,
    refetch: refetchProjects,
    isRefetching: isRefetchingProjects,
  } = useGetProjects(options);

  const projects = getProjects?.pages ?? [];

  const onLoadMore = () => {
    if (hasNextPageProjects) {
      fetchNextPageProjects();
    }
  };

  const loading = getProjectLoading;

  const renderItem = ({item}: {item: any}) => (
    <SectionListerProjectRow item={item} />
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
            refreshing={isRefetchingProjects}
            onRefresh={refetchProjects}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
            data={projects}
            ListEmptyComponent={EmptyData}
            ItemSeparatorComponent={ItemSeparatorComponent}
            renderItem={renderItem}
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

export default React.memo(SectionListerProjects);

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: scale(12),
  },
});
