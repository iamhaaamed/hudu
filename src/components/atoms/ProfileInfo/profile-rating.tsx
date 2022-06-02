import React from 'react';
import {HStack, Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '~/styles';

interface RatingProps {
  count: number;
  total: number;
}
export function ProfileRating(props: RatingProps) {
  return (
    <HStack p={1} alignItems="center" space={0.5}>
      {Array(5)
        .fill(0)
        .map((item, index) => {
          const filled = index < props.count;
          return (
            <Icon
              size={14}
              name={filled ? 'star' : 'star-o'}
              color={filled ? Colors.WARNING : Colors.BLACK}
            />
          );
        })}
      {props.total && <Text color={Colors.GARY_3}>({props.total})</Text>}
    </HStack>
  );
}
