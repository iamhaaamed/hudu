import React, {useMemo} from 'react';
import {RefreshControl, StyleSheet} from 'react-native';
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
  RatingStar,
} from '~/components';
import {scale, fontFamily} from '~/utils/style';
import {Colors} from '~/styles';
import {userDataStore} from '~/stores';
import {useGetMeProfile, useGetProfile} from '~/hooks/user';
import {useGetBids} from '~/hooks/bid';
import images from '~/assets/images';

const HudurProfileScreen = ({route}: any) => {
  const {userId} = route?.params;
  const {userData} = userDataStore(state => state);

  const currentUser = userId === userData?.id;

  const options = currentUser ? {enabled: false} : {userId};
  const getMeOptions = currentUser ? {} : {enabled: false};
  const listerReviewOption = {
    where: {bidStatus: {eq: 'FINISHED'}, huduId: {eq: userId}},
  };

  const {isLoading: getProfileLoading, data: getProfile} =
    useGetProfile(options);
  const {isLoading: getMeProfileLoading, data: getMeProfile} =
    useGetMeProfile(getMeOptions);

  const {
    isLoading: getListerReviewsLoading,
    data: getListerReviews,
    fetchNextPage: fetchNextPageListerReviews,
    hasNextPage: hasNextPageListerReviews,
    refetch: refetchListerReviews,
    isRefetching: isRefetchingListerReviews,
  } = useGetBids(listerReviewOption);

  const profile = getProfile?.user_getProfile?.result ?? {};
  const myProfile = getMeProfile?.user_getProfile?.result ?? {};

  const data = currentUser ? myProfile || {} : profile || {};

  const listerReviews = getListerReviews?.pages ?? [];

  const totalReview = useMemo(() => {
    const listerCounts = data?.listersWhoRatedToMeCount;
    const hudurCounts = data?.huduersWhoRatedToMeCount;
    const reviews = Number(listerCounts) + Number(hudurCounts);
    return reviews ? reviews : 0;
  }, [data]);

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
    if (hasNextPageListerReviews) {
      fetchNextPageListerReviews();
    }
  };

  const loading =
    getProfileLoading || getListerReviewsLoading || getMeProfileLoading;

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
            refreshing={isRefetchingListerReviews}
            onRefresh={refetchListerReviews}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <Box mt="12">
          <Center position="absolute" alignSelf="center" zIndex={6} top="-32">
            <CustomImage
              imageSource={data?.imageAddress}
              style={styles.avatar}
              resizeMode="cover"
              zoomable
              errorImage={images.avatarErrorImage}
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
              {data?.userName ?? 'Hudur'}
            </Text>
            <VStack alignItems="flex-end">
              <RatingStar
                size={12}
                rate={data?.averageRate}
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
              <CustomCollapseText numberOfLines={2} text={data?.bio} />
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
        {listerReviews?.length > 0 && (
          <VStack
            space="2"
            m="4"
            px="4"
            py="4"
            borderRadius="lg"
            shadow="2"
            bg={Colors.WHITE}>
            {listerReviews?.map((itm: any, indx: number) => {
              return (
                <VStack key={indx}>
                  <HStack>
                    <Text
                      flex={0.2}
                      numberOfLines={1}
                      fontSize={scale(12)}
                      color={Colors.BLACK_1}
                      fontFamily={fontFamily.regular}>
                      {itm?.lister?.userName ?? 'Lister'} :
                    </Text>
                    <HStack space="1" flex={0.8}>
                      <Text
                        flex={1}
                        fontSize={scale(12)}
                        color={Colors.PLACEHOLDER}
                        fontFamily={fontFamily.regular}>
                        {itm?.listersComment}
                      </Text>
                      <VStack space="1">
                        <RatingStar
                          rate={itm?.listersRate}
                          showRating="right"
                          disabled
                          size={12}
                        />
                      </VStack>
                    </HStack>
                  </HStack>
                  {indx < listerReviews?.length - 1 && <Divider my="2" />}
                </VStack>
              );
            })}
          </VStack>
        )}
      </ScrollView>
    </CustomContainer>
  );
};

export default HudurProfileScreen;

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
