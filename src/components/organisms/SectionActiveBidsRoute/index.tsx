import React, {forwardRef, useCallback, memo} from 'react';
import {FlatList} from 'react-native';
import Animated from 'react-native-reanimated';
import {ActiveBidItem, EmptyData} from '~/components';

export const AnimatedFlatList: typeof FlatList =
  Animated.createAnimatedComponent(FlatList);

const SectionActiveBidsRoute = forwardRef(
  (
    {
      data,
      projectStatus,
      contentContainerStyle,
      onMomentumScrollEnd,
      onScrollEndDrag,
      scrollEventThrottle,
      scrollIndicatorInsets,
      onScroll,
    }: any,
    ref,
  ) => {
    const keyExtractor = useCallback((_, index: number) => `key${index}`, []);

    const renderItem = ({item, index}: {item: any; index: number}) => (
      <ActiveBidItem {...{item, index, projectStatus}} />
    );

    return (
      <AnimatedFlatList
        ref={ref}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        {...{
          data,
          onScroll,
          contentContainerStyle,
          onMomentumScrollEnd,
          onScrollEndDrag,
          scrollEventThrottle,
          scrollIndicatorInsets,
        }}
        ListEmptyComponent={() => <EmptyData flex={0.1} />}
        showsVerticalScrollIndicator={false}
      />
    );
  },
);

export default memo(SectionActiveBidsRoute);
