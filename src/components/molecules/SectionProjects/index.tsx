import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {HStack, VStack, Box, Center} from 'native-base';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {SectionSort, ProjectItem, EmptyData} from '~/components';
import {scale} from '~/utils/style';

const schema = yup.object().shape({
  sort: yup.string(),
});

const SectionProjects = ({
  data,
  onLoadMore,
  reload,
  isRefetching,
}: {
  data: any;
  onLoadMore?: any;
  reload?: any;
  isRefetching?: any;
}) => {
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const {register, watch} = methods;

  const sort = watch('sort');

  const renderItem = ({item}: {item: any}) => <ProjectItem item={item} />;

  return (
    <FormProvider {...methods}>
      <VStack space="3" flex={1}>
        <HStack px="4" justifyContent="flex-end">
          <Box flex={1} />
          <Center w={scale(120)}>
            <SectionSort {...register('sort')} />
          </Center>
        </HStack>
        <FlatList
          onRefresh={reload}
          refreshing={isRefetching}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapperStyle}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={EmptyData}
          numColumns={2}
          data={data || []}
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
  },
});
