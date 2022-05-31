import React, {useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Box, Center, Text, VStack, HStack} from 'native-base';
import PagerView from 'react-native-pager-view';
import {Colors} from '~/styles';
import images from '~/assets/images';
import {CustomButton, CustomImage} from '~/components';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {userDataStore} from '~/stores';

const data = [
  {
    imageUrl: images.intro1,
    title: 'Lister',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    imageUrl: images.intro2,
    title: 'HUDUr',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    imageUrl: images.intro3,
    title: 'Save money & time',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

export default function OnboardingScreen() {
  const {setIsOnboardingViewed} = userDataStore(state => state);

  const [page, setPage] = useState(0);

  const viewPager = useRef(null);

  const move = (viewPager: any, page: number, delta: any) => {
    viewPager.current.setPage(page + delta);
  };

  const onPressDone = async () => {
    setIsOnboardingViewed(true);
  };

  return (
    <Box flex={1} bg={Colors.WHITE}>
      <PagerView
        style={styles.flex1}
        ref={viewPager}
        initialPage={0}
        onPageSelected={e => setPage(e.nativeEvent.position)}>
        {data.map(({title, description, imageUrl}, index: number) => (
          <Box key={index + 1} flex={1} px="4" pt="8">
            <Text
              textAlign="center"
              fontSize={scale(40)}
              fontFamily={fontFamily.bold}
              color={Colors.BLACK_3}>
              {title}
            </Text>
            <Center flex={1}>
              <CustomImage
                imageSource={imageUrl}
                style={styles.image}
                resizeMode="stretch"
                local
                backgroundColor={Colors.TRANSPARENT}
              />
            </Center>
            <Text
              textAlign="center"
              fontSize={scale(16)}
              fontFamily={fontFamily.regular}
              color={Colors.BLACK_3}>
              {description}
            </Text>
          </Box>
        ))}
      </PagerView>
      <VStack px="4" py="6" space="8" alignItems="center">
        <HStack mt="8" space="2">
          {data.map((_, index: number) => {
            const isActive = index === page;
            return (
              <Box
                key={index}
                borderRadius="2"
                height="2"
                width={isActive ? '24' : '6'}
                bg={isActive ? Colors.PRIMARY : Colors.DISABLE_COLOR}
              />
            );
          })}
        </HStack>
        <CustomButton
          width={scale(145)}
          height={verticalScale(40)}
          title={page !== data.length - 1 ? 'Next' : 'Start'}
          onPress={() => {
            if (page !== data.length - 1) {
              move(viewPager, page, 1);
            } else {
              onPressDone();
            }
          }}
        />
      </VStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  flex1: {flex: 1},
  image: {
    height: verticalScale(275),
    width: '100%',
  },
});
