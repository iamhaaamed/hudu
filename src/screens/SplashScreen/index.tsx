import React from 'react';
import {Center} from 'native-base';
import images from '~/assets/images';
import {CustomImage} from '~/components';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from '~/utils/style';
import {Colors} from '~/styles';

export default function SplashScreen() {
  return (
    <Center flex={1} bg={Colors.BACKGROUND} px="4">
      <CustomImage
        imageSource={images.huduLogo1}
        style={styles.image}
        resizeMode="stretch"
        local
        backgroundColor={Colors.TRANSPARENT}
      />
    </Center>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 61,
    width: 275,
  },
});
