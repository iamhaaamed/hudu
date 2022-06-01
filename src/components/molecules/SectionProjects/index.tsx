import React from 'react';
import {HStack, VStack, Box, Center, View} from 'native-base';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {SectionSort, ProjectItem} from '~/components';
import images from '~/assets/images';
import {scale} from '~/utils/style';

const schema = yup.object().shape({
  sort: yup.string(),
});

const projects = [
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

const SectionProjects = () => {
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const {register, watch} = methods;

  const sort = watch('sort');

  return (
    <FormProvider {...methods}>
      <VStack space="3" px="4" flex={1}>
        <HStack justifyContent="flex-end">
          <Box flex={1} />
          <Center w={scale(120)}>
            <SectionSort {...register('sort')} />
          </Center>
        </HStack>
        <View
          w="100%"
          justifyContent="space-between"
          flexWrap="wrap"
          flexDirection="row">
          {projects?.map((item: any, index: number) => (
            <ProjectItem key={index} item={item} />
          ))}
        </View>
      </VStack>
    </FormProvider>
  );
};

export default SectionProjects;
