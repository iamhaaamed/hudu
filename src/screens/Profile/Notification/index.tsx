import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '~/styles';
import {CustomContainer, EmptyData} from '~/components';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text, Badge, HStack, FlatList, IconButton} from 'native-base';
import {useGetNotifications} from '~/hooks/notification';

export default function NotificationScreen() {
  const {
    isLoading: getNotificationsLoading,
    data: getNotifications,
    fetchNextPage: fetchNextPageNotifications,
    hasNextPage: hasNextPageNotifications,
    refetch,
    isRefetching,
  } = useGetNotifications();

  const notifications = getNotifications?.pages ?? [];

  const onLoadMore = () => {
    if (hasNextPageNotifications) {
      fetchNextPageNotifications();
    }
  };

  const loading = getNotificationsLoading;

  const renderItem = ({item}: {item: any}) => <NotificationItem {...{item}} />;

  return (
    <CustomContainer isLoading={loading}>
      <FlatList
        py="4"
        px="4"
        contentContainerStyle={styles.contentContainerStyle}
        data={notifications}
        keyExtractor={(_, index: number) => `key${index}`}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListEmptyComponent={EmptyData}
        onRefresh={refetch}
        refreshing={isRefetching}
        onEndReachedThreshold={0.5}
        onEndReached={({distanceFromEnd}) => {
          if (distanceFromEnd < 0) return;
          onLoadMore();
        }}
      />
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {flexGrow: 1},
});

const NotificationItem = ({item}: {item: any}) => {
  const deleteOnPress = () => {};

  return (
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
        icon={<Icon name="close" color={Colors.BLACK_3} size={24} />}
      />
    </HStack>
  );
};
