import React from 'react';
import {Center} from 'native-base';
import images from '~/assets/images';
import {CustomImage} from '~/components';
import {StyleSheet} from 'react-native';
import {verticalScale} from '~/utils/style';
import {Colors} from '~/styles';

export default function SplashScreen() {
  return (
    <Center flex={1} bg={Colors.BACKGROUND}>
      <CustomImage
        imageSource={images.huduLogo}
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
    height: verticalScale(195),
    width: verticalScale(195),
    borderRadius: 15,
  },
});
