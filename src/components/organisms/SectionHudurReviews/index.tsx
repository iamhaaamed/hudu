import React from 'react';
import {Box} from 'native-base';
import {Colors} from '~/styles';
import {FlatList, StyleSheet} from 'react-native';
import ReviewItem from '~/components/atoms/ReviewItem';
import SectionReviewContainer from '../../molecules/SectionReviewContainer';

export default function SectionHudurReviews() {
  const onLoadMore = () => {};

  const renderItem = ({item}: {item: any}) => (
    <ReviewItem title={item.title} content={item.content} rate={item.rate} />
  );

  const ItemSeparatorComponent = () => (
    <Box h="0.4" mx="3" bgColor={Colors.DISABLE_COLOR} />
  );

  return (
    <SectionReviewContainer>
      <FlatList
        data={Array(15).fill({
          title: 'Lister name',
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
