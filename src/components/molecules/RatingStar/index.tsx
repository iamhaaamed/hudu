import React from 'react';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Stars from 'react-native-stars';
import {Colors} from '~/styles';
import {Icon} from 'native-base';
import {scale} from '~/utils/style';

export default function StarRating({
  rate = 0,
  disabled = false,
  size = scale(16),
  spacing = 1,
  onChange,
}: {
  rate: number;
  disabled?: boolean;
  size?: number;
  spacing?: number;
  onChange?: any;
}) {
  const onChangeHandler = (value: number) => {
    onChange?.(value);
  };

  return (
    <View>
      <Stars
        disabled={disabled}
        default={Math.round(rate)}
        update={onChangeHandler}
        count={5}
        half={false}
        spacing={spacing}
        fullStar={
          <Icon
            as={<MaterialCommunityIcons name="star" />}
            size={size}
            color={Colors.GOLDEN}
          />
        }
        emptyStar={
          <Icon
            as={<MaterialCommunityIcons name="star-outline" />}
            size={size}
            color={Colors.BORDER_RATING}
          />
        }
      />
    </View>
  );
}
