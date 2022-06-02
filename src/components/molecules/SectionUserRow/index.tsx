import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, HStack, VStack, Icon, IconButton} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {fontFamily, scale} from '~/utils/style';
import {Colors} from '~/styles';
import {CustomImage, RatingStar} from '~/components';
import {useNavigation} from '@react-navigation/native';

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
      <IconButton
        onPress={notificationOnPress}
        icon={
          <MaterialCommunityIcons
            name="bell-outline"
            color={Colors.BLACK_1}
            size={24}
          />
        }
      />
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
