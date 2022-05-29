import React, {useEffect} from 'react';
import {Center} from 'native-base';
import images from '~/assets/images';
import {CustomImage} from '~/components';
import {StyleSheet} from 'react-native';
import {verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import {userDataStore} from '~/stores';

export default function SplashScreen({navigation}: {navigation: any}) {
  const {isOnboardingViewed} = userDataStore();

  useEffect(() => {
    setTimeout(() => {
      goToNext();
    }, 3000);
  }, []);

  const goToNext = () => {
    if (isOnboardingViewed) {
      navigation.replace('MainStack');
    } else {
      navigation.replace('onBoarding');
    }
  };

  return (
    <Center flex={1} bg={Colors.BACKGROUND}>
      <CustomImage
        imageSource={images.huduLogo}
        style={styles.image}
        resizeMode="stretch"
        local
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
