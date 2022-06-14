import React from 'react';
import {Colors} from '~/styles';
import {Spinner, Box} from 'native-base';
import {AttachmentPickerModal, CustomImage} from '~/components';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {useController} from 'react-hook-form';
import {useUploadFile} from '~/hooks/upload';
import {scale} from '~/utils/style';
import {AvatarIcon} from '~/assets/icons';

interface ProfilePickerProps {
  name?: any;
}
export default React.forwardRef(({name}: ProfilePickerProps, ref: any) => {
  const {field} = useController({name});
  const {mutate: uploadFileMutate, isLoading: isUploading} = useUploadFile();
  const [imagePickerVisible, setImagePickerVisible] = React.useState(false);

  const openImagePicker = () => {
    setImagePickerVisible(true);
  };

  const closeImagePicker = () => {
    setImagePickerVisible(false);
  };

  const onChangeImage = async (image: any) => {
    uploadFileMutate(image, {
      onSuccess: (successData: any) => {
        field.onChange(successData?.uploadedUrl);
      },
    });
  };

  return (
    <Box alignSelf="center">
      {field.value ? (
        <CustomImage
          imageSource={field.value}
          style={styles.image}
          resizeMode="stretch"
          zoomable
        />
      ) : (
        <AvatarIcon />
      )}

      <TouchableOpacity
        disabled={isUploading}
        activeOpacity={0.8}
        style={styles.plusButton}
        onPress={openImagePicker}>
        {isUploading ? (
          <Spinner size={scale(13)} color={Colors.WHITE} />
        ) : (
          <Material
            name={field?.value ? 'pencil' : 'plus'}
            color={Colors.WHITE}
            size={20}
          />
        )}
      </TouchableOpacity>
      <AttachmentPickerModal
        onClose={closeImagePicker}
        visible={imagePickerVisible}
        onChangeImage={onChangeImage}
      />
    </Box>
  );
});

const styles = StyleSheet.create({
  plusButton: {
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 5,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BLACK_3,
  },
  image: {
    height: scale(105),
    width: scale(105),
    borderRadius: 100,
  },
});
