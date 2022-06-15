import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Center, Icon, Spinner} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AttachmentPickerModal} from '~/components';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';
import {useUploadFile} from '~/hooks/upload';

const CustomImageUploader = ({onUploadImage}: {onUploadImage?: any}) => {
  const {mutate: uploadFileMutate, isLoading: isUploading} = useUploadFile();
  const [imagePickerVisible, setImagePickerVisible] = useState(false);

  const openImagePicker = () => {
    setImagePickerVisible(true);
  };

  const closeImagePicker = () => {
    setImagePickerVisible(false);
  };

  const onChangeImage = async (image: any) => {
    uploadFileMutate(image, {
      onSuccess: (successData: any) => {
        onUploadImage?.(successData?.uploadedUrl);
      },
    });
  };

  return (
    <>
      <TouchableOpacity
        disabled={isUploading}
        activeOpacity={0.7}
        onPress={openImagePicker}>
        <Center
          bg={Colors.IMAGE_UPLOADER_BACKGROUND}
          borderRadius="lg"
          borderColor={Colors.BLACK_3}
          borderWidth="1"
          size={scale(120)}>
          {isUploading ? (
            <Spinner size={scale(16)} color={Colors.BLACK_3} />
          ) : (
            <Icon
              as={<MaterialCommunityIcons name="plus" />}
              color={Colors.BLACK_3}
              size={scale(32)}
            />
          )}
        </Center>
      </TouchableOpacity>
      <AttachmentPickerModal
        onClose={closeImagePicker}
        visible={imagePickerVisible}
        onChangeImage={onChangeImage}
      />
    </>
  );
};

export default CustomImageUploader;
