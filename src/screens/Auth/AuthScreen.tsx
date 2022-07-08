import React from 'react';
import {Colors} from '~/styles';
import {VStack} from 'native-base';
import images from '~/assets/images';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from '~/utils/style';
import {CustomButton, CustomContainer, CustomImage} from '~/components';

export default function AuthScreen({navigation}: NavigationProp) {
  return (
    <CustomContainer>
      <VStack
        flex={1}
        px="4"
        bg={Colors.WHITE}
        alignItems="center"
        justifyContent="space-evenly">
        <CustomImage
          local
          style={styles.image}
          resizeMode="cover"
          imageSource={images.huduLogo1}
          backgroundColor={Colors.TRANSPARENT}
        />
        <VStack width="full" space="6">
          <CustomButton
            title="Create account"
            onPress={() =>
              navigation.navigate('AuthStack', {
                screen: 'SignUp',
              })
            }
          />
          <CustomButton
            title="Login"
            onPress={() => navigation.navigate('AuthStack', {screen: 'Login'})}
          />
        </VStack>
      </VStack>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  image: {
    height: verticalScale(61),
    width: scale(275),
  },
});
