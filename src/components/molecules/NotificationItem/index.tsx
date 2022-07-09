import React, {useEffect} from 'react';
import {Colors} from '~/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text, Badge, HStack, Spinner, VStack} from 'native-base';
import {useDeleteNotification, useReadNotification} from '~/hooks/notification';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {fontFamily, scale} from '~/utils/style';
import {navigate} from '~/navigation/Methods';
import {notificationsStore} from '~/stores';
import {ResponseStatus} from '~/generated/graphql';

const NotificationItem = ({item}: {item: any}) => {
  const {count, setCount} = notificationsStore(state => state);
  const {mutate: mutateReadNotification, isLoading: readNotificationLoading} =
    useReadNotification();
  const {
    mutate: mutateDeleteNotification,
    isLoading: deleteNotificationLoading,
  } = useDeleteNotification();

  useEffect(() => {
    if (item?.id && !item?.isReaded) {
      mutateReadNotification(item?.id, {
        onSuccess: successData => {
          if (
            successData?.notification_readNotification?.status ===
            ResponseStatus.Success
          ) {
            if (count > 0) {
              setCount(count - 1);
            }
          }
        },
        onError: () => {},
      });
    }
  }, []);

  const deleteOnPress = () => {
    mutateDeleteNotification(item?.id, {
      onSuccess: () => {},
    });
  };

  const onPressHandler = () => {
    navigate('ProjectDetailsHudur', {projectId: item?.projectId});
  };

  const getNotificationType = () => {
    switch (item?.notificationType) {
      case 'BID_APPROVED_BY_LISTER':
      case 'BID_REJECTED_BY_LISTER':
      case 'BID_CANCELLED_BY_HUDU':
        return '';
      case 'NEW_BID_GIVEN':
      case 'BID_WAS_EDITED':
        return item?.bid?.hudu?.userName;
      default:
        return '';
    }
  };

  return (
    <HStack
      mb="3"
      p="2"
      w="100%"
      rounded={10}
      borderWidth="1"
      overflow="hidden"
      borderColor={Colors.GARY_2}>
      {!item?.isReaded && (
        <Badge
          mt="1"
          px="1"
          h="3"
          w="3"
          mr="2"
          rounded="full"
          variant="solid"
          colorScheme="warning"
        />
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressHandler}
        style={styles.item}>
        <VStack>
          <Text
            color={Colors.BLACK_1}
            fontFamily={fontFamily.regular}
            fontSize={scale(13)}
            flex={1}>
            {getNotificationType()}
            {item?.title}
          </Text>
          <Text
            color={Colors.PLACEHOLDER}
            fontFamily={fontFamily.regular}
            fontSize={scale(13)}>
            {getNotificationType()}
            {item?.project?.title}
          </Text>
        </VStack>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={deleteOnPress}>
        {deleteNotificationLoading ? (
          <Spinner color={Colors.BLACK_3} size={24} />
        ) : (
          <Icon name="close" color={Colors.BLACK_3} size={24} />
        )}
      </TouchableOpacity>
    </HStack>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    marginRight: scale(14),
  },
});
