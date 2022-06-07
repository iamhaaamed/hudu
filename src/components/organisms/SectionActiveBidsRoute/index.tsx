import React from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {HStack, Text, VStack, Box, Center} from 'native-base';
import {HEADER_HEIGHT, TAB_BAR_HEIGHT, OTHER_PADDING} from '~/styles/spacing';
import {Colors} from '~/styles';
import {CustomImage, RatingStar, CustomButton} from '~/components';
import {scale, fontFamily} from '~/utils/style';
import {navigate} from '~/navigation/Methods';

const SectionActiveBidsRoute = ({
  position,
  syncOffset,
  activeBidsRef,
  onMomentumScrollBegin,
  data,
}: any) => {
  const {height} = useWindowDimensions();

  const cancelOnPress = () => {};

  const itemOnPress = () => {
    navigate('HudurProfile');
  };

  const ItemSeparatorComponent = () => <Box h="4" />;

  const renderItem = ({item}: {item: any}) => {
    return (
      <Center
        mx="4"
        px="4"
        py="4"
        borderRadius="lg"
        bg={Colors.WHITE}
        shadow="2">
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.item}
          onPress={itemOnPress}>
          <VStack space="2">
            <HStack space="2" alignItems="center">
              <CustomImage
                local
                imageSource={item?.image}
                resizeMode="stretch"
                style={styles.avatar}
              />
              <Text
                flex={1}
                fontSize={scale(14)}
                fontFamily={fontFamily.medium}
                color={Colors.BLACK_1}>
                {item?.name}
              </Text>
              <VStack alignItems="center">
                <RatingStar
                  size={14}
                  rate={item?.rating}
                  showRating="left"
                  disabled
                />
                <Text
                  fontSize={scale(10)}
                  fontFamily={fontFamily.regular}
                  color={
                    Colors.PLACEHOLDER
                  }>{`(${item?.totalReviews} review)`}</Text>
              </VStack>
            </HStack>
            <HStack space="2">
              <Text
                fontSize={scale(14)}
                fontFamily={fontFamily.regular}
                color={Colors.BLACK_1}>
                {'Note: '}
              </Text>
              <Text
                flex={1}
                fontSize={scale(14)}
                fontFamily={fontFamily.regular}
                color={Colors.PLACEHOLDER}>
                {item?.note}
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text
                fontSize={scale(14)}
                fontFamily={fontFamily.regular}
                color={Colors.BLACK_1}>
                Your bid
              </Text>
              <Text
                fontSize={scale(14)}
                fontFamily={fontFamily.regular}
                color={Colors.PRIMARY}>
                $ {item?.bidAmount}
              </Text>
            </HStack>
            {item?.id === 3 && (
              <CustomButton
                color={Colors.BLACK_3}
                outline
                title="Cancel"
                onPress={cancelOnPress}
              />
            )}
          </VStack>
        </TouchableOpacity>
      </Center>
    );
  };

  return (
    <Animated.FlatList
      ref={activeBidsRef}
      scrollEventThrottle={1}
      showsVerticalScrollIndicator={false}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScroll={Animated.event(
        [{nativeEvent: {contentOffset: {y: position}}}],
        {
          useNativeDriver: true,
        },
      )}
      onMomentumScrollEnd={e => {
        syncOffset('active-bids', e.nativeEvent.contentOffset.y);
      }}
      data={data}
      keyExtractor={(_, i) => `key${i}`}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparatorComponent}
      contentContainerStyle={[
        styles.contentContainerStyle,
        {
          minHeight: height,
        },
      ]}
    />
  );
};

export default SectionActiveBidsRoute;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: HEADER_HEIGHT + TAB_BAR_HEIGHT + OTHER_PADDING,
  },
  avatar: {
    height: scale(33),
    width: scale(33),
    borderRadius: 100,
  },
  item: {
    flex: 1,
    width: '100%',
  },
});
