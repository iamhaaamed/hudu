import React from 'react';
import {Colors} from '~/styles';
import {navigate} from '~/navigation/Methods';
import {fontFamily, scale} from '~/utils/style';
import {Box, Center, HStack, Text, VStack} from 'native-base';
import {CustomButton, CustomImage, RatingStar} from '~/components';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';

const SectionActiveBidsRoute = ({data}: any) => {
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
    <FlatList
      data={data}
      renderItem={renderItem}
      scrollEventThrottle={1}
      keyExtractor={(_, i) => `key${i}`}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={ItemSeparatorComponent}
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
};

export default SectionActiveBidsRoute;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 24,
    paddingBottom: 32,
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
