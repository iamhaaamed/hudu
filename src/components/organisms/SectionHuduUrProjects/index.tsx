import React from 'react';
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

  const options = isUserLoggedIn
    ? {where: {huduId: {eq: userData?.id}}}
    : {enabled: false};

  const {
    isLoading: getBidsLoading,
    data: getBids,
    fetchNextPage: fetchNextPageGetBids,
    hasNextPage: hasNextPageGetBids,
    isRefetching,
  } = useGetBids(options);

  const projects = getBids?.pages ?? [];

  const {register, watch} = methods;

  const sort = watch('sort');

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
