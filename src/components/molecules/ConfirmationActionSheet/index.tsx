import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Actionsheet, Box, Text, VStack} from 'native-base';
import {Colors} from '~/styles';

interface PickerItemProps {
  title: string;
  onPress: () => void;
}

export default function ConfirmationActionSheet({
  visible,
  onSubmit,
  onClose,
}: {
  visible: boolean;
  onSubmit: any;
  onClose: any;
}) {
  const pickerData = [
    {
      title: 'Delete',
      onPress: () => onPressSubmit(),
    },
    {
      title: 'Cancel',
      onPress: () => onClose?.(),
    },
  ];

  const onPressSubmit = () => {
    onSubmit?.();
  };

  return (
    <Actionsheet isOpen={visible} onClose={onClose}>
      <Actionsheet.Content bg={Colors.WHITE}>
        <VStack space="2" w="full" p="4">
          {pickerData?.map((item: PickerItemProps, index: number) => {
            return (
              <Box
                key={index}
                pb="3"
                borderBottomWidth={index + 1 < pickerData?.length ? 1 : 0}
                borderColor={Colors.BLACK_3}>
                <TouchableOpacity onPress={item.onPress} activeOpacity={0.7}>
                  <Text color={Colors.BLACK_3}>{item?.title}</Text>
                </TouchableOpacity>
              </Box>
            );
          })}
        </VStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
}
