import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {IconButton} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ConfirmationActionSheet, CustomImage} from '~/components';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';

const ImageBoxViewer = ({item, onDelete}: {item: any; onDelete?: any}) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const onSubmitDeleteModal = () => {
    onDelete?.(item);
    closeDeleteModal();
  };

  return (
    <>
      <CustomImage
        style={styles.image}
        imageSource={item}
        resizeMode="stretch"
        zoomable>
        {onDelete && (
          <IconButton
            position="absolute"
            bottom="2"
            right="2"
            rounded="full"
            onPress={openDeleteModal}
            size={scale(36)}
            bg={Colors.WHITE_RIPPLE_COLOR}
            icon={
              <Ionicons
                name="trash-outline"
                color={Colors.BLACK_1}
                size={scale(22)}
              />
            }
          />
        )}
      </CustomImage>
      <ConfirmationActionSheet
        visible={deleteModalVisible}
        onClose={closeDeleteModal}
        onSubmit={onSubmitDeleteModal}
      />
    </>
  );
};

export default ImageBoxViewer;

const styles = StyleSheet.create({
  image: {
    height: scale(120),
    width: scale(120),
    borderRadius: 10,
  },
});
