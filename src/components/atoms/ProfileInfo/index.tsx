import React from 'react';
import {Colors} from '~/styles';
import {fontFamily} from '~/utils/style';
import {ProfileRating} from './profile-rating';
import {Avatar, Box, Text, VStack} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProfileInfo() {
  return (
    <VStack
      top={-50}
      alignSelf="center"
      position="absolute"
      alignItems="center">
      <Box>
        <Avatar
          size={'xl'}
          source={{
            uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          }}>
          BC
        </Avatar>

        <TouchableOpacity activeOpacity={0.8} style={styles.plusButton}>
          <Material name="plus" color="#fff" size={20} />
        </TouchableOpacity>
      </Box>
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

const styles = StyleSheet.create({
  plusButton: {
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 5,
    position: 'absolute',
    alignItems: 'center',
    borderColor: '#fafafa',
    justifyContent: 'center',
    backgroundColor: Colors.BLACK_3,
  },
});
