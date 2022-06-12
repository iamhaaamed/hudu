import React from 'react';
import {HStack, Icon, Text} from 'native-base';
import Octicons from 'react-native-vector-icons/Octicons';
import Stars from 'react-native-stars';
import {Colors} from '~/styles';
import {fontFamily, scale} from '~/utils/style';

export default function StarRating({
  rate = 0,
  disabled = false,
  size = scale(16),
  spacing = 1,
  onChange,
  showRating,
}: {
  rate: number;
  disabled?: boolean;
  size?: number;
  spacing?: number;
  onChange?: any;
  showRating?: 'right' | 'left';
}) {
  const onChangeHandler = (value: number) => {
    onChange?.(value);
  };

  return (
    <HStack space="1" alignItems="center">
      {showRating === 'left' && (
        <Text
          fontSize={size - 2}
          fontFamily={fontFamily.regular}
          color={Colors.BLACK_1}>
          {Math.round(rate).toFixed(1)}
        </Text>
      )}
      <Stars
        disabled={disabled}
        default={Math.round(rate)}
        update={onChangeHandler}
        count={5}
        half={false}
        spacing={spacing}
        fullStar={
          <Icon
            as={<Octicons name="star-fill" />}
            size={size}
            color={Colors.GOLDEN}
          />
        }
        emptyStar={
          <Icon
            as={<Octicons name="star" />}
            size={size}
            color={Colors.BORDER_RATING}
          />
        }
      />
      {showRating === 'right' && (
        <Text
          fontSize={size - 4}
          fontFamily={fontFamily.regular}
          color={Colors.BLACK_1}>
          {Math.round(rate).toFixed(1)}
        </Text>
      )}
    </HStack>
  );
}
