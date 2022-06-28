import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {VStack} from 'native-base';
import {
  ListerReviewItem,
  SectionReviewContainer,
  CustomLoading,
  EmptyData,
} from '~/components';
import {useGetBids} from '~/hooks/bid';
import {userDataStore} from '~/stores';

const SectionListerReviews = () => {
  const {userData} = userDataStore(state => state);

  const listerReviewOption = {
    where: {bidStatus: {eq: 'FINISHED'}, listerId: {eq: userData?.id}},
  };

  const {
    isLoading: getListerReviewsLoading,
    data: getListerReviews,
    fetchNextPage: fetchNextPageListerReviews,
    hasNextPage: hasNextPageListerReviews,
    refetch: refetchListerReviews,
    isRefetching: isRefetchingListerReviews,
  } = useGetBids(listerReviewOption);

  const listerReviews = getListerReviews?.pages ?? [];

  const onLoadMore = () => {
    if (hasNextPageListerReviews) {
      fetchNextPageListerReviews();
    }
  };

  const renderItem = ({item, index}: {item: any; index: number}) => (
    <ListerReviewItem {...{item, index, arrayLength: listerReviews?.length}} />
  );

  return (
    <SectionReviewContainer>
      <VStack flexGrow={1} h="100%">
        {getListerReviewsLoading ? (
          <CustomLoading />
        ) : (
          <FlatList
            refreshing={isRefetchingListerReviews}
            onRefresh={refetchListerReviews}
            data={listerReviews}
            renderItem={renderItem}
            ListEmptyComponent={EmptyData}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => `key${index + 1}`}
            contentContainerStyle={styles.contentContainerStyle}
            onEndReached={({distanceFromEnd}: any) => {
              if (distanceFromEnd < 0) return;
              onLoadMore();
            }}
          />
        )}
      </VStack>
    </SectionReviewContainer>
  );
};

export default React.memo(SectionListerReviews);

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});
