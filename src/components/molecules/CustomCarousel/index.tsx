import React, {useMemo, useState} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {verticalScale} from '~/utils/style';
import {CustomImage} from '~/components';
import {Colors} from '~/styles';

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

  const [activeSlide, setActiveSlide] = useState(0);

  const imageArrayData = useMemo(() => {
    return data?.map((imageItem: any) => ({url: imageItem?.imageAddress}));
  }, [data]);

  const _renderItem = ({item}: {item: any}) => {
    return (
      <CustomImage
        style={[styles.image, {height}]}
        imageSource={item?.imageAddress}
        resizeMode="cover"
        zoomable
        imageSourceArray={imageArrayData}
      />
    );
  };

  if (data && data?.length > 0) {
    return (
      <>
        <Carousel
          scrollEnabled={scrollEnabled}
          sliderWidth={width}
          sliderHeight={height}
          itemWidth={width}
          data={data ?? []}
          renderItem={_renderItem}
          firstItem={firstItem}
          pagingEnabled
          onSnapToItem={index => setActiveSlide(index)}
        />
        <Pagination
          dotsLength={data?.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.containerStyle}
          dotStyle={styles.dotStyle}
          inactiveDotOpacity={0.6}
          inactiveDotScale={0.9}
        />
      </>
    );
  }

  return (
    <CustomImage
      style={[styles.image, {height}]}
      imageSource={null}
      resizeMode="cover"
      zoomable
      imageSourceArray={data}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
  },
  containerStyle: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 50,
  },
  dotStyle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 0.5,
    backgroundColor: Colors.DOT_RIPPLE_COLOR,
  },
});
