import React from 'react';
import {Colors} from '~/styles';
import {HStack, Text, VStack} from 'native-base';
import {ProfileRating} from '../ProfileInfo/profile-rating';

interface ReviewItemProps {
  rate: number;
  title: string;
  content: string;
}
export default function ReviewItem({title, content, rate}: ReviewItemProps) {
  return (
    <HStack p="4">
      <VStack flex={0.2}>
        <Text color={Colors.BLACK_1}>{title}</Text>
      </VStack>
      <VStack flex={0.58} alignItems="center">
        <Text numberOfLines={3} color={Colors.BLACK_2}>
          {content}
        </Text>
      </VStack>
      <VStack flex={0.2}>
        <ProfileRating count={rate} />
      </VStack>
    </HStack>
  );
}
