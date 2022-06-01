import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, HStack, Icon, Center} from 'native-base';
import {scale, fontFamily} from '~/utils/style';
import {Colors} from '~/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
        <TouchableOpacity activeOpacity={0.7} onPress={onPressHandler}>
          <Center p="1">
            <Icon
              as={<MaterialCommunityIcons name="close" />}
              size={scale(24)}
              color={Colors.BLACK_1}
            />
          </Center>
        </TouchableOpacity>
      )}
    </HStack>
  );
};

export default ModalHeader;
