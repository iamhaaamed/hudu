import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, VStack} from 'native-base';
import {Colors} from '~/styles';
import {fontFamily, scale} from '~/utils/style';
import {CustomImage, RatingStar} from '~/components';

export default function ProfileInfo() {
  return (
    <VStack
      top={-50}
      alignSelf="center"
      position="absolute"
      alignItems="center"
      space="1">
      <CustomImage
        style={styles.avatar}
        imageSource={
          'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        }
        resizeMode="stretch"
      />
      <Text fontFamily={fontFamily.bold}>BCcontracting</Text>
      <Text fontFamily={fontFamily.regular} color={Colors.GARY_3}>
        BCcontracting@gmail.com
      </Text>
      <RatingStar rate={4} showRating="left" size={14} total={200} />
    </VStack>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: scale(105),
    width: scale(105),
    borderRadius: 100,
  },
});
