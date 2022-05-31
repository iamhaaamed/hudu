import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Text, VStack, HStack, Center} from 'native-base';
import {CustomContainer, FavoriteItem, CustomPicker} from '~/components';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import images from '~/assets/images';
import {fontFamily, scale} from '~/utils/style';
import {Colors} from '~/styles';

const schema = yup.object().shape({
  sort: yup.string(),
});

const sortData = [
  {id: 0, title: 'Option1', value: 'Option1'},
  {id: 1, title: 'Option2', value: 'Option2'},
  {id: 2, title: 'Option3', value: 'Option3'},
];

const favorites = [
  {
    id: 0,
    timeLeft: '3 Days',
    title: 'Project 1',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
    lowBid: 190,
    image: images.testImage1,
  },
  {
    id: 1,
    timeLeft: '3 Days',
    title: 'Project 2',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
    image: images.testImage1,
  },
  {
    id: 2,
    timeLeft: '3 Days',
    title: 'Project 3',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
    lowBid: 190,
    image: images.testImage1,
  },
];

const FavoriteScreen = () => {
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const {register, watch} = methods;

  const sort = watch('sort');

  const onLoadMore = () => {};

  const renderItem = ({item}: {item: any}) => <FavoriteItem item={item} />;

  return (
    <CustomContainer>
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
            <Center w={scale(90)}>
              <CustomPicker
                {...register('sort')}
                data={sortData}
                placeholder="Sort"
              />
            </Center>
          </HStack>
          <FlatList
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.columnWrapperStyle}
            numColumns={2}
            data={favorites}
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
});
