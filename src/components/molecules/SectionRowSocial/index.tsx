import React from 'react';
import {Platform} from 'react-native';
import {Colors} from '~/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Divider, HStack, IconButton, Text, VStack} from 'native-base';

export default function SectionRowSocial({
  googleOnPress,
  facebookOnPress,
  appleOnPress,
}: {
  googleOnPress: () => void;
  facebookOnPress: () => void;
  appleOnPress: () => void;
}) {
  return (
    <VStack px="4" mt="2" width="full">
      <HStack width="full" alignItems="center">
        <Divider flex={1} bgColor="black" />
        <Text mx="8" fontSize={18}>
          Continue with
        </Text>
        <Divider flex={1} bgColor="black" />
      </HStack>
      <HStack mt="4" space="4" justifyContent="center">
        <SocialButton
          as={Ionicons}
          name="logo-google"
          onPress={googleOnPress}
        />
        <SocialButton
          left={4}
          name="facebook"
          as={FontAwesome}
          onPress={facebookOnPress}
        />
        {Platform.OS === 'ios' && (
          <SocialButton
            left={2}
            name="apple"
            as={FontAwesome}
            onPress={appleOnPress}
          />
        )}
      </HStack>
    </VStack>
  );
}

function SocialButton({name, as, left, onPress}: any) {
  return (
    <IconButton
      onPress={onPress}
      variant="solid"
      bgColor={Colors.PRIMARY}
      _icon={{
        as,
        name,
        style: {
          left,
        },
      }}
    />
  );
}
