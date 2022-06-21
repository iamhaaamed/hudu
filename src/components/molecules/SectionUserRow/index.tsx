import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, HStack, VStack, IconButton} from 'native-base';
import {fontFamily, scale} from '~/utils/style';
import {Colors} from '~/styles';
import {CustomImage, RatingStar} from '~/components';
import {BellIcon} from '~/assets/icons';
import {navigate} from '~/navigation/Methods';
import images from '~/assets/images';

const SectionUserRow = ({data}: {data: any}) => {
  const notificationOnPress = () => navigate('Notification');

  return (
    <HStack alignItems="center" px="4" py="2" space="4">
      <CustomImage
        imageSource={data?.imageAddress}
        style={styles.image}
        resizeMode="stretch"
        errorImage={images.avatarErrorImage}
      />
      <VStack flex={1}>
        <Text
          fontSize={scale(22)}
          fontFamily={fontFamily.bold}
          color={Colors.BLACK_1}>
          Welcome
        </Text>
        <HStack alignItems="center" space="2">
          <Text
            fontSize={scale(14)}
            fontFamily={fontFamily.regular}
            color={Colors.BLACK_1}>
            {data?.userName}
          </Text>
          <RatingStar disabled showRating="right" rate={data?.averageRate} />
        </HStack>
      </VStack>
      <IconButton onPress={notificationOnPress} icon={<BellIcon />} />
    </HStack>
  );
};

export default SectionUserRow;

const styles = StyleSheet.create({
  image: {
    height: scale(53),
    width: scale(53),
    borderRadius: 100,
  },
});
