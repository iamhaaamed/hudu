import React from 'react';
import {Colors} from '~/styles';
import {fontFamily} from '~/utils/style';
import {ProfileRating} from './profile-rating';
import {Avatar, Box, Text, VStack} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfilePicker from '../ProfilePicker';

export default function ProfileInfo() {
  return (
    <VStack
      top={-50}
      alignSelf="center"
      position="absolute"
      alignItems="center">
      <ProfilePicker />
      <Text mt={3} fontFamily={fontFamily.bold}>
        BCcontracting
      </Text>
      <Text mt={1} fontFamily={fontFamily.regular} color={Colors.GARY_3}>
        BCcontracting@gmail.com
      </Text>
      <ProfileRating count={4} total={200} />
    </VStack>
  );
}
