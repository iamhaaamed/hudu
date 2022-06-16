import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {VStack} from 'native-base';
import {
  HudurReviewItem,
  SectionReviewContainer,
  CustomLoading,
  EmptyData,
} from '~/components';
import {useGetBids} from '~/hooks/bid';
import {userDataStore} from '~/stores';

const SectionHudurReviews = () => {
  const {userData} = userDataStore(state => state);

  const hudurReviewOption = {
    where: {bidStatus: {eq: 'FINISHED'}, huduId: {eq: userData?.id}},
  };

  const {
    isLoading: getHudurReviewsLoading,
    data: getHudurReviews,
    fetchNextPage: fetchNextPageHudurReviews,
    hasNextPage: hasNextPageHudurReviews,
    refetch: refetchHudurReviews,
    isRefetching: isRefetchingHudurReviews,
  } = useGetBids(hudurReviewOption);

  const hudurReviews = getHudurReviews?.pages ?? [];

  console.log(hudurReviews);

  const onLoadMore = () => {
    if (hasNextPageHudurReviews) {
      fetchNextPageHudurReviews();
    }
  };

  const renderItem = ({item, index}: {item: any; index: number}) => (
    <HudurReviewItem {...{item, index, arrayLength: hudurReviews?.length}} />
  );

  return (
    <SectionReviewContainer>
      <VStack flexGrow={1} h="100%">
        {getHudurReviewsLoading ? (
          <CustomLoading />
        ) : (
          <FlatList
            data={hudurReviews}
            refreshing={isRefetchingHudurReviews}
            onRefresh={refetchHudurReviews}
            renderItem={renderItem}
            ListEmptyComponent={EmptyData}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => `key${index}`}
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

export default React.memo(SectionHudurReviews);

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});
