import React from 'react';
import {Colors} from '~/styles';
import {fontFamily} from '~/utils/style';
import {HStack, IconButton, Text} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';

export function CustomHeader({
  back,
  route,
  options,
  navigation,
}: NativeStackHeaderProps) {
  return (
    <HStack px={4} alignItems="center" bgColor={Colors.WHITE}>
      {back && (
        <IconButton
          onPress={() => navigation.goBack()}
          icon={<Icon name="chevron-back" color="#000" size={24} />}
        />
      )}
      <Text
        flex={1}
        fontSize={18}
        textAlign="center"
        fontFamily={fontFamily.medium}>
        {options?.headerTitle}
      </Text>
      <IconButton disabled />
    </HStack>
  );
}
