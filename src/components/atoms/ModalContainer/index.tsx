import React from 'react';
import {Modal, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {scale} from '~/utils/style';

function ModalContainer({
  isVisible,
  onClose,
  children,
  backdropColor,
  backgroundColor,
  justify = 'center',
  style = styles.modalInnerContainer,
}: {
  isVisible: boolean;
  onClose: any;
  children: any;
  onModalHide?: any;
  backdropColor?: string;
  backgroundColor?: string;
  justify?: any;
  style?: any;
}) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={[
            styles.modalContainer,
            {
              justifyContent: justify,
              backgroundColor: backdropColor || 'rgba(0,0,0,0.6)',
            },
          ]}>
          <TouchableWithoutFeedback>
            <View
              style={[
                style,
                {
                  backgroundColor: backgroundColor || '#F8F8F8',
                },
              ]}>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default React.memo(ModalContainer);

const styles = StyleSheet.create({
  modalContainer: {flex: 1},
  modalInnerContainer: {
    borderRadius: 16,
    margin: scale(32),
  },
});
