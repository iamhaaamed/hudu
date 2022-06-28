import React from 'react';
import {Text, HStack, IconButton} from 'native-base';
import {scale, fontFamily} from '~/utils/style';
import {Colors} from '~/styles';
import Icon from 'react-native-vector-icons/Ionicons';

const ModalHeader = ({text, onPress}: {text?: string; onPress?: any}) => {
  const onPressHandler = () => {
    onPress?.();
  };

  return (
    <HStack alignItems="center" justifyContent="space-between">
      <Text
        fontSize={scale(16)}
        fontFamily={fontFamily.medium}
        color={Colors.BLACK_1}>
        {text}
      </Text>
      {onPress && (
        <IconButton
          onPress={onPressHandler}
          icon={<Icon name="close" color={Colors.BLACK} size={24} />}
        />
      )}
    </HStack>
  );
};

export default ModalHeader;
