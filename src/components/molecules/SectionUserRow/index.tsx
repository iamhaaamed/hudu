import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, HStack, VStack, IconButton} from 'native-base';
import {fontFamily, scale} from '~/utils/style';
import {Colors} from '~/styles';
import {CustomImage, RatingStar} from '~/components';
import {useNavigation} from '@react-navigation/native';
import {BellIcon} from '~/assets/icons';

const SectionUserRow = () => {
  const {navigate} = useNavigation();
  const data = {
    name: 'Amarjith',
    image: '',
    rating: 4,
  };

  const notificationOnPress = () => navigate('Notification');

  return (
    <HStack alignItems="center" px="4" py="2" space="4">
      <CustomImage
        imageSource={data?.image}
        style={styles.image}
        resizeMode="stretch"
      />
      <VStack flex={1}>
        <Text
          fontSize={scale(22)}
          fontFamily={fontFamily.bold}
          color={Colors.BLACK_1}>
          Welcome
        </Text>
        <HStack alignItems="center">
          <Text
            fontSize={scale(14)}
            fontFamily={fontFamily.regular}
            color={Colors.BLACK_1}>
            {data?.name}
          </Text>
          <RatingStar disabled rate={data?.rating} />
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
