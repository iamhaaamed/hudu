import React from 'react';
import {Divider} from 'native-base';
import {FlatList, StyleSheet} from 'react-native';
import ReviewItem from '~/components/atoms/ReviewItem';
import SectionReviewContainer from '../../molecules/SectionReviewContainer';

export default function SectionListerReviews() {
  const onLoadMore = () => {};

  const renderItem = ({item}: {item: any}) => (
    <ReviewItem title={item.title} content={item.content} rate={item.rate} />
  );

  const ItemSeparatorComponent = () => <Divider mx="3" />;
  return (
    <SectionReviewContainer>
      <FlatList
        data={Array(15).fill({
          title: 'HUDUr',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          rate: 3,
        })}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => `key${index}`}
        ItemSeparatorComponent={ItemSeparatorComponent}
        contentContainerStyle={styles.contentContainerStyle}
        onEndReached={({distanceFromEnd}: any) => {
          if (distanceFromEnd < 0) return;
          onLoadMore();
        }}
      />
    </SectionReviewContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});
