import React from 'react';
import {Colors} from '~/styles';
import {Avatar, Box} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

interface ProfilePickerProps {
  source?: string;
}
export default function ProfilePicker() {
  return (
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
