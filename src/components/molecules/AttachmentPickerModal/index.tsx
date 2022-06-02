import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Actionsheet, Box, Text, VStack} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import {cameraOptions} from '~/utils/camera';
import {Colors} from '~/styles';

interface PickerItemProps {
  title: string;
  onPress: () => void;
}

export default function AttachmentPickerModal({
  visible,
  onChangeImage,
  onClose,
}: {
  visible: boolean;
  onChangeImage: any;
  onClose: any;
}) {
  const pickerData = [
    {
      title: 'Choose from gallery',
      onPress: () => onPressGalleryPhoto(),
    },
    {
      title: 'Take photo',
      onPress: () => onPressOpenCamera(),
    },
  ];

  const onPressOpenCamera = () => {
    ImagePicker.openCamera(cameraOptions)
      .then((image: any) => {
        onChangeImage?.(image);
      })
      .finally(onClose);
  };

  const onPressGalleryPhoto = () => {
    ImagePicker.openPicker(cameraOptions)
      .then((image: any) => {
        onChangeImage?.(image);
      })
      .finally(onClose);
  };

  return (
    <Actionsheet isOpen={visible} onClose={onClose}>
      <Actionsheet.Content bg={Colors.WHITE}>
        <VStack space="2" w="full" p="4">
          {pickerData.map((item: PickerItemProps, index: number) => {
            return (
              <Box
                key={index + 2}
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
