import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Box, HStack, IconButton, VStack, Text, Center} from 'native-base';
import {CustomImage, RatingStar} from '~/components';
import {goBack, navigate} from '~/navigation/Methods';
import {Colors} from '~/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fontFamily, scale, verticalScale} from '~/utils/style';

export const PHOTO_SIZE = 120;

const Header = ({title, image, user}: any) => {
  const backOnPress = () => {
    goBack();
  };

  const favoriteOnPress = () => {};

  const listerProfileOnPress = () => {
    navigate('ListerProfile');
  };

  return (
    <VStack h={user ? verticalScale(396) : verticalScale(310)}>
      <CustomImage
        local
        style={[styles.image]}
        resizeMode="stretch"
        imageSource={image}>
        <HStack p="4" alignItems="center" justifyContent="space-between">
          <IconButton
            onPress={backOnPress}
            bg={Colors.WHITE_RIPPLE_COLOR}
            colorScheme={Colors.WHITE_RIPPLE_COLOR}
            borderRadius="full"
            icon={
              <Ionicons name="chevron-back" color={Colors.BLACK_3} size={24} />
            }
          />
          <IconButton
            onPress={favoriteOnPress}
            bg={Colors.WHITE_RIPPLE_COLOR}
            colorScheme={Colors.WHITE_RIPPLE_COLOR}
            borderRadius="full"
            icon={
              <Ionicons name="heart-outline" color={Colors.BLACK_3} size={24} />
            }
          />
        </HStack>
      </CustomImage>
      <Box
        bg={Colors.WHITE}
        w="100%"
        bottom="0"
        px="4"
        py="4"
        borderTopRadius="2xl"
        position="absolute">
        {title && (
          <Text
            fontSize={scale(20)}
            fontFamily={fontFamily.medium}
            color={Colors.BLACK}>
            {title}
          </Text>
        )}
        {user && (
          <Center
            mt="4"
            bg={Colors.WHITE}
            shadow="4"
            borderRadius="lg"
            py="2"
            px="2">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={listerProfileOnPress}
              style={styles.profileRow}>
              <HStack space="4">
                <CustomImage
                  local
                  imageSource={user?.image}
                  style={styles.avatar}
                  resizeMode="stretch"
                />
                <VStack space="0.5" flex={1}>
                  <Text
                    fontSize={scale(16)}
                    color={Colors.BLACK_1}
                    fontFamily={fontFamily.medium}>
                    {user?.name}
                  </Text>
                  <Text
                    fontSize={scale(12)}
                    color={Colors.PLACEHOLDER}
                    fontFamily={fontFamily.regular}>
                    {user?.email}
                  </Text>
                </VStack>
                <VStack space="0.5" alignItems="center">
                  <RatingStar rate={user?.rating} showRating="right" />
                  <Text
                    fontSize={scale(10)}
                    color={Colors.PLACEHOLDER}
                    fontFamily={fontFamily.regular}>
                    {`(${user?.totalReviews} review)`}
                  </Text>
                </VStack>
              </HStack>
            </TouchableOpacity>
          </Center>
        )}
      </Box>
    </VStack>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: verticalScale(302),
  },
  avatar: {
    height: scale(46),
    width: scale(46),
    borderRadius: 100,
  },
  profileRow: {
    flex: 1,
    width: '100%',
  },
});

export default memo(Header);
