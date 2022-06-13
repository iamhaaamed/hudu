import React from 'react';
import {Colors} from '~/styles';
import {Flex, VStack} from 'native-base';
import images from '~/assets/images';
import {StyleSheet} from 'react-native';
import {verticalScale} from '~/utils/style';
import {CustomButton, CustomContainer, CustomImage} from '~/components';

export default function AuthScreen({navigation}: NavigationProp) {
  return (
    <CustomContainer>
      <VStack
        flex={1}
        bg={Colors.WHITE}
        alignItems="center"
        justifyContent="space-evenly">
        <CustomImage
          local
          style={styles.image}
          resizeMode="stretch"
          imageSource={images.huduLogo}
        />
        <VStack width="full" px="4" space="6">
          <CustomButton
            title="Create account"
            onPress={() => navigation.navigate('SignUp')}
          />
          <CustomButton
            title="Login"
            onPress={() => navigation.navigate('Login')}
          />
        </VStack>
      </VStack>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 15,
    height: verticalScale(195),
    width: verticalScale(195),
  },
});
