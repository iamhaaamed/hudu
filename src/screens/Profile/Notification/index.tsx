import React from 'react';
import {StyleSheet} from 'react-native';
import {CustomContainer, EmptyData, NotificationItem} from '~/components';
import {FlatList} from 'native-base';
import {useGetNotifications} from '~/hooks/notification';

export default function NotificationScreen() {
  const options = {
    order: {createdDate: 'DESC'},
  };

  const {
    isLoading: getNotificationsLoading,
    data: getNotifications,
    fetchNextPage: fetchNextPageNotifications,
    hasNextPage: hasNextPageNotifications,
    refetch,
    isRefetching,
  } = useGetNotifications(options);

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
