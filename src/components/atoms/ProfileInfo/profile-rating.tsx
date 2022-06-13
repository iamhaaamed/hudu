import React, {Fragment} from 'react';
import {HStack, Text} from 'native-base';
import {Colors} from '~/styles';
import {StarIcon, StarIconFill} from '~/assets/icons';

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
            <Fragment key={index}>
              {filled ? <StarIconFill /> : <StarIcon />}
            </Fragment>
          );
        })}
      {props.total && <Text color={Colors.GARY_3}>({props.total})</Text>}
    </HStack>
  );
}
