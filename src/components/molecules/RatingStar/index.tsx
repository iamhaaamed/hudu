import React from 'react';
import {HStack, Text, VStack} from 'native-base';
import Stars from 'react-native-stars';
import {Colors} from '~/styles';
import {fontFamily, scale} from '~/utils/style';
import {StarIcon, StarIconFill} from '~/assets/icons';

export default function StarRating({
  rate = 0,
  disabled = false,
  size = scale(16),
  spacing = 1,
  onChange,
  showRating,
  total,
}: {
  rate: number;
  disabled?: boolean;
  size?: number;
  spacing?: number;
  onChange?: any;
  showRating?: 'right' | 'left';
  total?: number;
}) {
  const onChangeHandler = (value: number) => {
    onChange?.(value);
  };

  return (
    <VStack alignItems="center">
      <HStack space="1" alignItems="center">
        {showRating === 'left' && (
          <Text
            fontSize={size - 2}
            fontFamily={fontFamily.regular}
            color={Colors.GARY_3}>
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
          fullStar={<StarIconFill size={size} />}
          emptyStar={<StarIcon size={size} />}
        />
        {showRating === 'right' && (
          <Text
            fontSize={size - 2}
            fontFamily={fontFamily.regular}
            color={Colors.GARY_3}>
            {Math.round(rate).toFixed(1)}
          </Text>
        )}
      </HStack>
      {(total || total >= 0) && (
        <Text
          fontSize={size - 2}
          fontFamily={fontFamily.regular}
          color={Colors.GARY_3}>
          {`(${total} Review)`}
        </Text>
      )}
    </VStack>
  );
}
