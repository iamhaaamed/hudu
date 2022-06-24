import React from 'react';
import {TouchableOpacity} from 'react-native';
import {HStack, Text} from 'native-base';
import {fontFamily, scale} from '~/utils/style';
import {Colors} from '~/styles';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomIconButton = ({
  title,
  name,
  onPress,
}: {
  title: string;
  name: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <HStack space="1" alignItems="center">
        <Icon size={24} color={Colors.PRIMARY} name={name} />
        <Text
          fontSize={scale(16)}
          fontFamily={fontFamily.medium}
          color={Colors.PRIMARY}>
          {title}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export default CustomIconButton;
