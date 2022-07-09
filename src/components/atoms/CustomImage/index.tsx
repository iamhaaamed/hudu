import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Platform} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {verticalScale, scale} from '~/utils/style';
import {Colors} from '~/styles';
import ModalContainer from '../ModalContainer';
import FastImage from 'react-native-fast-image';
import images from '~/assets/images';
import {Spinner} from 'native-base';

const CustomImage = ({
  imageSource,
  style,
  zoomable = false,
  resizeMode = FastImage.resizeMode.contain,
  backgroundColor = Colors.GARY_1,
  local = false,
  children,
  imageSourceArray,
  errorImage = images.errorImage,
}: {
  imageSource?: any;
  style?: any;
  zoomable?: boolean;
  resizeMode?: 'cover' | 'center' | 'contain' | 'repeat' | 'stretch';
  backgroundColor?: any;
  local?: boolean;
  children?: any;
  imageSourceArray?: any;
  errorImage?: any;
}) => {
  const [imageZoom, setImageZoom] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onPressHandler = () => {
    setImageZoom(true);
  };

  const oncloseZoomModal = () => {
    setImageZoom(false);
  };

  const onProgress = () => {
    setLoading(true);
  };

  const onLoadEnd = () => {
    setLoading(false);
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={!zoomable}
        onPress={onPressHandler}
        style={{
          height: style?.height ?? null,
          width: style?.width ?? null,
          borderRadius: style?.borderRadius ?? null,
        }}>
        <FastImage
          style={[style, {backgroundColor}]}
          source={
            local
              ? imageSource
              : imageSource && imageSource !== null
              ? {
                  uri: imageSource,
                  priority: FastImage.priority.high,
                }
              : errorImage
          }
          onProgress={onProgress}
          onLoadEnd={onLoadEnd}
          onError={onLoadEnd}
          resizeMode={resizeMode}>
          {loading && (
            <Spinner
              position="absolute"
              alignSelf="center"
              size={24}
              color={Colors.PRIMARY}
            />
          )}
          {children && children}
        </FastImage>
      </TouchableOpacity>
      <ModalContainer
        isVisible={imageZoom}
        onClose={oncloseZoomModal}
        style={styles.flex1}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            onPress={oncloseZoomModal}
            activeOpacity={0.7}
            style={styles.closeIcon}>
            <MaterialCommunityIcons
              name={'close-circle-outline'}
              color={Colors.WHITE}
              size={verticalScale(24)}
            />
          </TouchableOpacity>
        </View>
        <ImageViewer
          enableSwipeDown
          imageUrls={
            imageSourceArray && imageSourceArray?.length > 0
              ? imageSourceArray
              : [
                  local
                    ? {
                        url: '',
                        props: {
                          source: imageSource ? imageSource : errorImage,
                        },
                      }
                    : imageSource
                    ? {url: imageSource}
                    : {
                        url: '',
                        props: {
                          source: errorImage,
                        },
                      },
                ]
          }
          onSwipeDown={oncloseZoomModal}
        />
      </ModalContainer>
    </>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  modalHeader: {
    position: 'absolute',
    top: verticalScale(16),
    right: scale(16),
    zIndex: 1000,
  },
  closeIcon: {
    padding: 2,
    marginTop: Platform.OS === 'android' ? 0 : 10,
  },
});

export default CustomImage;
