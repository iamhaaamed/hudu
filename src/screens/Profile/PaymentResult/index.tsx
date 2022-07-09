import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, Center, VStack, HStack, IconButton} from 'native-base';
import {CustomContainer} from '~/components';
import {Colors} from '~/styles';
import {scale, fontFamily} from '~/utils/style';
import {resetRoot} from '~/navigation/Methods';
import Icon from 'react-native-vector-icons/Ionicons';

const PaymentResultScreen = ({route}: {route: any}) => {
  const {data} = route?.params;

  const goBackHandler = () => {
    resetRoot('MainTabs');
  };

  return (
    <CustomContainer>
      <HStack px={4} alignItems="center" bgColor={Colors.WHITE}>
        <IconButton
          onPress={goBackHandler}
          icon={<Icon name="chevron-back" color={Colors.BLACK} size={24} />}
        />

        <Text
          flex={1}
          fontSize={18}
          textAlign="center"
          fontFamily={fontFamily.medium}>
          Payment status
        </Text>
        <IconButton disabled />
      </HStack>
      <Center flex={1}>
        <VStack space="2">
          <TouchableOpacity activeOpacity={0.7} onPress={goBackHandler}>
            <Text
              color={Colors.PRIMARY}
              fontSize={scale(18)}
              fontFamily={fontFamily.medium}>
              Go to home
            </Text>
          </TouchableOpacity>
        </VStack>
      </Center>
    </CustomContainer>
  );
};

export default PaymentResultScreen;
