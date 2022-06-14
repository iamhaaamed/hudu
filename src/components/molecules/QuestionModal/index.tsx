import React from 'react';
import {StyleSheet} from 'react-native';
import {VStack, Center, Text, HStack} from 'native-base';
import {ModalContainer, CustomButton} from '~/components';
import {scale, fontFamily, verticalScale} from '~/utils/style';
import {Colors} from '~/styles';

const QuestionModal = ({
  visible,
  onClose,
  option1 = '',
  option1OnPress,
  option2 = '',
  option2OnPress,
  title,
  loading,
}: {
  visible: boolean;
  onClose: any;
  option1?: string;
  option1OnPress?: any;
  option2?: string;
  option2OnPress?: any;
  title: string;
  loading?: boolean;
}) => {
  const onCloseHandler = () => {
    onClose?.();
  };

  const option1Handler = () => {
    option1OnPress?.();
  };

  const option2Handler = () => {
    option2OnPress?.();
  };

  return (
    <ModalContainer
      isVisible={visible}
      onClose={onCloseHandler}
      style={styles.modal}
      loading={loading}>
      <VStack
        bg={Colors.WHITE}
        px="2"
        pt="8"
        pb="4"
        space="8"
        borderRadius="md">
        <Text
          textAlign="center"
          fontSize={scale(16)}
          fontFamily={fontFamily.medium}
          color={Colors.BLACK_1}>
          {title}
        </Text>
        <HStack space="2">
          <Center flex={1}>
            <CustomButton
              height={verticalScale(35)}
              title={option1}
              onPress={option1Handler}
              fontSize={scale(12)}
            />
          </Center>
          <Center flex={1}>
            <CustomButton
              height={verticalScale(35)}
              title={option2}
              onPress={option2Handler}
              fontSize={scale(12)}
            />
          </Center>
        </HStack>
      </VStack>
    </ModalContainer>
  );
};

export default QuestionModal;

const styles = StyleSheet.create({
  modal: {
    borderRadius: 8,
    margin: scale(16),
    overflow: 'hidden',
  },
});
