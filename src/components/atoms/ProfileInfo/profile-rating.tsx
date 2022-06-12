import React from 'react';
import {HStack, Text} from 'native-base';
import Octicons from 'react-native-vector-icons/Octicons';
import {Colors} from '~/styles';

interface RatingProps {
  count: number;
  total?: number;
}
export function ProfileRating(props: RatingProps) {
  return (
    <HStack p={1} alignItems="center" space={0.5}>
      {Array(5)
        .fill(0)
        .map((item, index) => {
          const filled = index < props.count;
          return (
            <Octicons
              size={14}
              key={index}
              name={filled ? 'star-fill' : 'star'}
              color={filled ? Colors.WARNING : Colors.BLACK}
            />
          );
        })}
      {props.total && <Text color={Colors.GARY_3}>({props.total})</Text>}
    </HStack>
  );
}
