import React, {useMemo} from 'react';
import {StyleSheet, RefreshControl} from 'react-native';
import {
  Box,
  VStack,
  Text,
  Center,
  HStack,
  ScrollView,
  Divider,
} from 'native-base';
import {
  CustomCollapseText,
  CustomContainer,
  CustomImage,
  EmptyData,
  RatingStar,
} from '~/components';
import {scale, fontFamily} from '~/utils/style';
import {Colors} from '~/styles';
import {useGetProfile} from '~/hooks/user';
import {useGetBids} from '~/hooks/bid';
import images from '~/assets/images';

const ListerProfileScreen = ({route}: any) => {
  const {userId} = route?.params;

  const options = {userId};

  const {isLoading: getProfileLoading, data: getProfile} =
    useGetProfile(options);

  const hudurReviewOption = {
    where: {bidStatus: {eq: 'FINISHED'}, listerId: {eq: userId}},
  };

  const {
    isLoading: getHudurReviewsLoading,
    data: getHudurReviews,
    fetchNextPage: fetchNextPageHudurReviews,
    hasNextPage: hasNextPageHudurReviews,
    refetch: refetchHudurReviews,
    isRefetching: isRefetchingHudurReviews,
  } = useGetBids(hudurReviewOption);

  const profile = getProfile?.user_getProfile?.result ?? {};

  const hudurReviews = getHudurReviews?.pages ?? [];

  const totalReview = useMemo(() => {
    const listerCounts = profile?.listersWhoRatedToMeCount;
    const hudurCounts = profile?.huduersWhoRatedToMeCount;
    const reviews = Number(listerCounts) + Number(hudurCounts);
    return reviews ? reviews : 0;
  }, [profile]);

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const onLoadMore = () => {
    if (hasNextPageHudurReviews) {
      fetchNextPageHudurReviews();
    }
  };

  const loading = getProfileLoading || getHudurReviewsLoading;

  return (
    <CustomContainer isLoading={loading}>
      <ScrollView
        onScroll={({nativeEvent}: any) => {
          if (isCloseToBottom(nativeEvent)) {
            onLoadMore();
          }
        }}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingHudurReviews}
            onRefresh={refetchHudurReviews}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <Box mt="12">
          <Center position="absolute" alignSelf="center" zIndex={6} top="-32">
            <CustomImage
              style={styles.avatar}
              imageSource={profile?.imageAddress ?? ''}
              resizeMode="cover"
              errorImage={images.avatarErrorImage}
              zoomable
            />
          </Center>
          <VStack
            mx="4"
            mb="4"
            px="4"
            pt="20"
            pb="4"
            space="2"
            shadow="4"
            bg={Colors.WHITE}
            borderRadius="lg"
            alignItems="center">
            <Text
              fontSize={scale(14)}
              fontFamily={fontFamily.medium}
              color={Colors.BLACK_1}>
              {profile?.userName ?? 'Lister'}
            </Text>
            <VStack alignItems="flex-end">
              <RatingStar
                size={12}
                rate={profile?.averageRate}
                showRating="right"
                disabled
                total={totalReview}
              />
            </VStack>
            <HStack space="2">
              <Text
                fontSize={scale(14)}
                fontFamily={fontFamily.regular}
                color={Colors.BLACK_1}>
                Bio:
              </Text>
              <CustomCollapseText numberOfLines={2} text={profile?.bio} />
            </HStack>
          </VStack>
        </Box>
        <Text
          mx="4"
          fontSize={scale(14)}
          fontFamily={fontFamily.medium}
          color={Colors.BLACK_1}>
          Reviews
        </Text>
        {hudurReviews?.length > 0 ? (
          <VStack
            space="2"
            m="4"
            px="4"
            py="4"
            borderRadius="lg"
            shadow="2"
            bg={Colors.WHITE}>
            {hudurReviews?.map((itm: any, indx: number) => {
              return (
                <VStack key={indx}>
                  <HStack>
                    <Text
                      flex={0.15}
                      numberOfLines={1}
                      fontSize={scale(12)}
                      color={Colors.BLACK_1}
                      fontFamily={fontFamily.regular}>
                      {itm?.hudu?.userName ?? 'Hudur'}
                    </Text>
                    <HStack space="1" flex={0.85}>
                      <Text
                        flex={1}
                        fontSize={scale(12)}
                        color={Colors.PLACEHOLDER}
                        fontFamily={fontFamily.regular}>
                        {itm?.hudusComment}
                      </Text>
                      <VStack space="1">
                        <RatingStar
                          rate={itm?.hudusRate}
                          showRating="right"
                          disabled
                          size={12}
                        />
                      </VStack>
                    </HStack>
                  </HStack>
                  {indx < hudurReviews?.length - 1 && <Divider my="1" />}
                </VStack>
              );
            })}
          </VStack>
        ) : (
          <EmptyData />
        )}
      </ScrollView>
    </CustomContainer>
  );
};

export default ListerProfileScreen;

const styles = StyleSheet.create({
  avatar: {
    height: scale(105),
    width: scale(105),
    borderRadius: 100,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
});
