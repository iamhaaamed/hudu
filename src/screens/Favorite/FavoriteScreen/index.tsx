import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Text, VStack, HStack, Center} from 'native-base';
import {
  CustomContainer,
  FavoriteItem,
  SectionSort,
  EmptyData,
} from '~/components';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {fontFamily, scale} from '~/utils/style';
import {Colors} from '~/styles';
import {useGetUserLikeProjects} from '~/hooks/project';
import {authStore} from '~/stores';
import Geolocation from 'react-native-geolocation-service';
import {requestLocationPermission} from '~/utils/getPermissions';
import dayjs from 'dayjs';

const schema = yup.object().shape({
  sort: yup.string(),
});

const FavoriteScreen = () => {
  const {isUserLoggedIn} = authStore(state => state);
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const today = dayjs(new Date());

  const [options, setOptions] = useState({
    location: [12, 12],
    where: {project: {projectDeadLine: {lte: today}}},
  });

  const options2 = isUserLoggedIn ? options : {enabled: isUserLoggedIn};
  const [currentLocation, setCurrentLocation] = useState({location: [12, 12]});

  const {
    isLoading: getUserLikeProjectsLoading,
    data: getUserLikeProjects,
    fetchNextPage: fetchNextPageUserLikeProjects,
    hasNextPage: hasNextPageUserLikeProjects,
    refetch: refetchUserLikeProjects,
    isRefetching: isRefetchingUserLikeProjects,
  } = useGetUserLikeProjects(options2);

  const userLikeProjects = getUserLikeProjects?.pages ?? [];

  const {register, watch} = methods;

  const sort = watch('sort');

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
        where: {project: {projectDeadLine: {lte: today}}},
      });
    }
  }, [sort]);

  const onLoadMore = () => {
    if (hasNextPageUserLikeProjects) {
      fetchNextPageUserLikeProjects();
    }
  };

  const renderItem = ({item}: {item: any}) => <FavoriteItem item={item} />;

  const loading = getUserLikeProjectsLoading;

  return (
    <CustomContainer isLoading={loading}>
      <FormProvider {...methods}>
        <VStack space="3" py="4" flex={1}>
          <HStack px="4" justifyContent="flex-end">
            <Text
              flex={1}
              fontSize={scale(18)}
              fontFamily={fontFamily.medium}
              color={Colors.BLACK_1}>
              Favorites
            </Text>
            <Center w={scale(120)}>
              <SectionSort {...register('sort')} />
            </Center>
          </HStack>
          <FlatList
            onRefresh={refetchUserLikeProjects}
            refreshing={isRefetchingUserLikeProjects}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.columnWrapperStyle}
            contentContainerStyle={styles.contentContainerStyle}
            ListEmptyComponent={EmptyData}
            numColumns={2}
            data={userLikeProjects}
            renderItem={renderItem}
            keyExtractor={(_, index) => `key${index}`}
            onEndReachedThreshold={0.5}
            onEndReached={({distanceFromEnd}) => {
              if (distanceFromEnd < 0) return;
              onLoadMore();
            }}
          />
        </VStack>
      </FormProvider>
    </CustomContainer>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  columnWrapperStyle: {
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
});
