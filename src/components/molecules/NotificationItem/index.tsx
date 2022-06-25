import React, {useEffect} from 'react';
import {Colors} from '~/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text, Badge, HStack, IconButton, Spinner} from 'native-base';
import {useDeleteNotification, useReadNotification} from '~/hooks/notification';
import {TouchableOpacity} from 'react-native';

const NotificationItem = ({item}: {item: any}) => {
  const {mutate: mutateReadNotification, isLoading: readNotificationLoading} =
    useReadNotification();
  const {
    mutate: mutateDeleteNotification,
    isLoading: deleteNotificationLoading,
  } = useDeleteNotification();

  useEffect(() => {
    mutateReadNotification(item?.id, {
      onSuccess: () => {},
      onError: () => {},
    });
  }, []);

  const deleteOnPress = () => {
    mutateDeleteNotification(item?.id, {
      onSuccess: () => {},
    });
  };

  const onPressHandler = () => {};

  return (
    <TouchableOpacity
      disabled={true}
      activeOpacity={0.7}
      onPress={onPressHandler}>
      <HStack
        mb="3"
        px="2"
        w="100%"
        rounded={10}
        borderWidth="1"
        overflow="hidden"
        alignItems="center"
        borderColor={Colors.GARY_2}>
        {!item?.isReaded && (
          <Badge
            px="1"
            mr="2"
            h="3"
            w="3"
            rounded="full"
            variant="solid"
            colorScheme="warning"
          />
        )}
        <Text flex={1}>{item?.title}</Text>
        <IconButton
          rounded="full"
          onPress={deleteOnPress}
          colorScheme={Colors.RED_RIPPLE_COLOR}
          icon={
            deleteNotificationLoading ? (
              <Spinner color={Colors.BLACK_3} size={24} />
            ) : (
              <Icon name="close" color={Colors.BLACK_3} size={24} />
            )
          }
        />
      </HStack>
    </TouchableOpacity>
  );
};

export default NotificationItem;
