import React, {memo, useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Box, HStack, IconButton, VStack, Text, Center} from 'native-base';
import {
  CustomImage,
  RatingStar,
  CustomCarousel,
  ProjectFavoriteIcon,
} from '~/components';
import {goBack, navigate} from '~/navigation/Methods';
import {Colors} from '~/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import assetsImages from '~/assets/images';
import {userDataStore} from '~/stores';

export const PHOTO_SIZE = 120;

const Header = ({title, images, user, isLiked, projectId}: any) => {
  const {userData} = userDataStore(state => state);

  const isLister = userData?.id === user?.id;

  const totalReview = useMemo(() => {
    const listerCounts = user?.listersWhoRatedToMeCount;
    const hudurCounts = user?.huduersWhoRatedToMeCount;
    const reviews = Number(listerCounts) + Number(hudurCounts);
    return reviews ? reviews : 0;
  }, [user]);

  const backOnPress = () => {
    goBack();
  };

  const listerProfileOnPress = () => {
    navigate('ListerProfile', {userId: user?.id});
  };

  return (
    <VStack h={user && !isLister ? verticalScale(396) : verticalScale(310)}>
      <VStack>
        <HStack
          w="100%"
          position="absolute"
          zIndex={4}
          p="4"
          alignItems="center"
          justifyContent="space-between">
          <IconButton
            onPress={backOnPress}
            bg={Colors.FAVORITE_RIPPLE_COLOR}
            colorScheme={Colors.WHITE_RIPPLE_COLOR}
            borderRadius="full"
            icon={
              <Ionicons name="chevron-back" color={Colors.BLACK_3} size={24} />
            }
          />
          <ProjectFavoriteIcon {...{isLiked, projectId, size: 24}} />
        </HStack>
        <CustomCarousel height={verticalScale(302)} data={images} />
      </VStack>
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
        {!isLister && user && (
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
                  imageSource={user?.imageAddress}
                  style={styles.avatar}
                  resizeMode="stretch"
                  errorImage={assetsImages.avatarErrorImage}
                />
                <Text
                  flex={1}
                  fontSize={scale(16)}
                  color={Colors.BLACK_1}
                  fontFamily={fontFamily.medium}>
                  {user?.userName}
                </Text>
                <RatingStar
                  rate={user?.averageRate}
                  showRating="right"
                  total={totalReview}
                  disabled
                />
              </HStack>
            </TouchableOpacity>
          </Center>
        )}
      </Box>
    </VStack>
  );
};

const styles = StyleSheet.create({
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
