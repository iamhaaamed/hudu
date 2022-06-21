import React from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {verticalScale} from '~/utils/style';
import {CustomImage} from '~/components';

export default function CustomCarousel(props: {
  height?: number;
  onPress?: any;
  data?: any;
  scrollEnabled?: boolean;
  firstItem?: number;
}) {
  const {width} = useWindowDimensions();
  const {
    height = verticalScale(302),
    data,
    scrollEnabled = true,
    firstItem = 0,
  } = props;

  const _renderItem = ({item}: {item: any}) => {
    return (
      <CustomImage
        style={[styles.image, {height}]}
        imageSource={item?.imageAddress}
        resizeMode="stretch"
        zoomable
        imageSourceArray={data}
      />
    );
  };

  if (data && data?.length > 0) {
    return (
      <Carousel
        scrollEnabled={scrollEnabled}
        sliderWidth={width}
        sliderHeight={height}
        itemWidth={width}
        data={data ?? []}
        renderItem={_renderItem}
        firstItem={firstItem}
        pagingEnabled
      />
    );
  }

  return (
    <CustomImage
      style={[styles.image, {height}]}
      imageSource={null}
      resizeMode="stretch"
      zoomable
      imageSourceArray={data}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
  },
});
