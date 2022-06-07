import React from 'react';
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
  CustomButton,
  CustomCollapseText,
  CustomContainer,
  ProfilePicker,
  RatingStar,
} from '~/components';
import images from '~/assets/images';
import {StyleSheet} from 'react-native';
import {scale, fontFamily, verticalScale} from '~/utils/style';
import {Colors} from '~/styles';

const HudurProfileListerScreen = ({navigation, route}: any) => {
  const data = {
    id: 1,
    name: 'BCcontracting',
    image: images.testImage1,
    email: 'BCcontracting@gmail.com',
    rating: 4,
    totalReview: 150,
    bio: 'Lorem ipsum dolor sit amet, consetetur, amet sadipscing elitr, sed diam',
    reviews: [
      {
        id: 0,
        name: 'Lister name',
        review:
          'Lorem ipsum dolor sit amet,  sit consetetur sadipscing elitr, sed diam nonumy eirmod',
        rate: 3,
      },
      {
        id: 1,
        name: 'Lister name',
        review:
          'Lorem ipsum dolor sit amet,  sit consetetur sadipscing elitr, sed diam nonumy eirmod',
        rate: 1,
      },
      {
        id: 2,
        name: 'Lister name',
        review:
          'Lorem ipsum dolor sit amet,  sit consetetur sadipscing elitr, sed diam nonumy eirmod',
        rate: 3,
      },
      {
        id: 3,
        name: 'Lister name',
        review:
          'Lorem ipsum dolor sit amet,  sit consetetur sadipscing elitr, sed diam nonumy eirmod',
        rate: 5,
      },
    ],
  };

  const awardOnPress = () => {};

  const rejectOnPress = () => {};

  return (
    <CustomContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <HStack my="4" px="4" space="4">
          <Center flex={1}>
            <CustomButton
              title="Award"
              onPress={awardOnPress}
              height={verticalScale(35)}
            />
          </Center>
          <Center flex={1}>
            <CustomButton
              color={Colors.BLACK_3}
              outline
              title="Reject"
              onPress={rejectOnPress}
              height={verticalScale(35)}
            />
          </Center>
        </HStack>
        <Box mt="12">
          <Center position="absolute" alignSelf="center" zIndex={6} top="-32">
            <ProfilePicker />
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
              {data?.name}
            </Text>
            <Text
              fontSize={scale(14)}
              fontFamily={fontFamily.regular}
              color={Colors.PLACEHOLDER}>
              {data?.email}
            </Text>
            <VStack alignItems="flex-end">
              <RatingStar
                size={14}
                rate={data?.rating}
                showRating="right"
                disabled
              />
              <Text
                fontSize={scale(14)}
                fontFamily={fontFamily.regular}
                color={Colors.PLACEHOLDER}>
                {`(${data?.totalReview} Review)`}
              </Text>
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
        <VStack
          space="2"
          m="4"
          px="4"
          py="4"
          borderRadius="lg"
          shadow="2"
          bg={Colors.WHITE}>
          {data?.reviews?.map((itm: any, indx: number) => {
            return (
              <VStack key={indx}>
                <HStack space="1">
                  <Text
                    fontSize={scale(12)}
                    color={Colors.BLACK_1}
                    fontFamily={fontFamily.regular}>
                    {itm?.name}
                  </Text>
                  <Text
                    flex={1}
                    fontSize={scale(12)}
                    color={Colors.PLACEHOLDER}
                    fontFamily={fontFamily.regular}>
                    {itm?.review}
                  </Text>
                  <VStack space="1">
                    <RatingStar rate={itm?.rate} disabled size={14} />
                  </VStack>
                </HStack>
                {indx < data?.reviews?.length - 1 && <Divider my="1" />}
              </VStack>
            );
          })}
        </VStack>
      </ScrollView>
    </CustomContainer>
  );
};

export default HudurProfileListerScreen;

const styles = StyleSheet.create({
  avatar: {
    height: scale(33),
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
});
