import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Text, HStack, VStack, IconButton} from 'native-base';
import {fontFamily, scale} from '~/utils/style';
import {Colors} from '~/styles';
import {CustomImage, RatingStar} from '~/components';
import {BellIcon} from '~/assets/icons';
import {navigate} from '~/navigation/Methods';
import images from '~/assets/images';
import {useNotificationSubscription} from '~/hooks/notification';
import {userDataStore} from '~/stores';
import {useQueryClient} from 'react-query';
import queryKeys from '~/constants/queryKeys';

const SectionUserRow = ({data, loading}: {data: any; loading?: boolean}) => {
  const queryClient = useQueryClient();
  const {userData} = userDataStore(state => state);

  const [notificationData, setNotificationData] = useState(undefined);

  useNotificationSubscription({
    userId: userData?.id,
    callback: (data: any) => onGetNotification(data),
  });

  useEffect(() => {
    closeNotification();
  }, [notificationData]);

  const closeNotification = () => {
    setTimeout(() => {
      setNotificationData(undefined);
    }, 10000);
  };

  const onGetNotification = (event: any) => {
    const res = JSON.parse(event.data);
    if (
      res?.type !== 'ka' &&
      res.type === 'data' &&
      res?.payload?.data?.notificationAdded
    ) {
      setNotificationData(res?.payload?.data?.notificationAdded);
      queryClient.invalidateQueries(queryKeys.notifications);
    }
  };

  const notificationOnPress = () => navigate('Notification');

  return (
    <VStack>
      {notificationData && (
        <HStack
          w="100%"
          px="4"
          bg={Colors.SECONDARY}
          alignItems="center"
          justifyContent="space-between">
          <Text
            flex={1}
            fontSize={scale(12)}
            color={Colors.BLACK_1}
            fontFamily={fontFamily.regular}>
            {notificationData?.title ?? ''}
          </Text>
        </HStack>
      )}
      <HStack alignItems="center" px="4" py="2" space="4">
        <CustomImage
          imageSource={data?.imageAddress}
          style={styles.image}
          resizeMode="cover"
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
    </VStack>
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
