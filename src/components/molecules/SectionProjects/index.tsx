import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {HStack, VStack, Box, Center} from 'native-base';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  SectionSort,
  ProjectItem,
  EmptyData,
  CustomContainer,
} from '~/components';
import {scale, verticalScale} from '~/utils/style';
import {useGetProjects} from '~/hooks/project';
import {requestLocationPermission} from '~/utils/getPermissions';
import {showMessage} from 'react-native-flash-message';
import Geolocation from 'react-native-geolocation-service';
import dayjs from 'dayjs';
import {authStore} from '~/stores';

const schema = yup.object().shape({
  sort: yup.string(),
});

const SectionProjects = () => {
  const {isLoadingLogin} = authStore(state => state);
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const {register, watch, setValue} = methods;

  const sort = watch('sort');

  const today = dayjs(new Date());

  const [options, setOptions] = useState({
    projectFilter: 'NEWEST_TO_OLDEST',
    location: [12, 12],
    where: {
      and: [
        {project: {projectDeadLine: {gt: today}}},
        {project: {projectStatus: {eq: 'BIDDING'}}},
      ],
    },
  });
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 12,
    longitude: 12,
  });

  useEffect(() => {
    setValue('sort', undefined);
  }, [isLoadingLogin]);

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
        location: [currentLocation?.latitude, currentLocation?.longitude],
        where: {
          and: [
            {project: {projectDeadLine: {gt: today}}},
            {project: {projectStatus: {eq: 'BIDDING'}}},
          ],
        },
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

  const renderItem = ({item}: {item: any}) => <ProjectItem item={item} />;

  return (
    <CustomContainer isLoading={getProjectLoading}>
      <FormProvider {...methods}>
        <VStack space="1" flex={1}>
          <HStack px="4" justifyContent="flex-end">
            <Box flex={1} />
            <Center w={scale(120)}>
              <SectionSort {...register('sort')} />
            </Center>
          </HStack>
          <FlatList
            onRefresh={refetchProjects}
            refreshing={isRefetchingProjects}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.columnWrapperStyle}
            contentContainerStyle={styles.contentContainerStyle}
            ListEmptyComponent={EmptyData}
            numColumns={2}
            data={projects}
            renderItem={renderItem}
            keyExtractor={(_, index) => `key${index}`}
            onEndReachedThreshold={0.9}
            onEndReached={({distanceFromEnd}) => {
              if (distanceFromEnd < 0) return;
              onLoadMore?.();
            }}
          />
        </VStack>
      </FormProvider>
    </CustomContainer>
  );
};

export default SectionProjects;

const styles = StyleSheet.create({
  columnWrapperStyle: {
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: verticalScale(8),
  },
});
