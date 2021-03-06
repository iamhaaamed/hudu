import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Center, Text} from 'native-base';
import {fontFamily, scale} from '~/utils/style';
import {Colors} from '~/styles';

export default function EmptyData({
  text = 'No result',
  flex = 1,
}: {
  text?: string;
  flex?: number;
}) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Center flex={flex}>
        <Text
          color={Colors.EMPTY_DATA}
          fontFamily={fontFamily.regular}
          fontSize={scale(16)}>
          {text}
        </Text>
      </Center>
    </TouchableWithoutFeedback>
  );
}
