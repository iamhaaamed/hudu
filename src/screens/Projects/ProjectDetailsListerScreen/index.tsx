import {Colors} from '~/styles';
import images from '~/assets/images';
import React, {useState} from 'react';
import {fontFamily, scale} from '~/utils/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HEADER_HEIGHT, TABS_HEIGHT} from '~/styles/spacing';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Center, HStack, IconButton, Text, VStack} from 'native-base';
import {
  RatingStar,
  CustomImage,
  CustomContainer,
  CollapsibleTabBar,
  SectionQuestionRouteLister,
  SectionActiveBidsRouteLister,
  SectionDescriptionRouteLister,
} from '~/components';

const data = {
  title: 'Duct need cleaned out',
  image: images.testImage1,
  hudur: {
    name: 'Mary Olivia',
    email: 'aaa@gmail.com',
    rating: 4,
    totalReviews: 200,
    image: images.testImage1,
  },
  description: {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis Lorem ipsum dolor sit amet, consectetur adipiscing elit. DuisLorem ipsum dolor sit amet, consectetur adipiscing elit.',
    lowBid: 100,
    timeLeft: '3Days:3H:23M:20S',
    location: 'Grimes , IA',
    howLong: '12 Minutes',
  },
  questions: [
    {
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis Lorem ipsum dolor sit amet, consectetur adipiscing elit. DuisLorem ipsum dolor sit amet, consectetur adipiscing elit.',
      user: {
        id: 1,
        name: 'Mr.Jack',
      },
    },
    {
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis Lorem ipsum dolor sit amet, consectetur adipiscing elit. DuisLorem ipsum dolor sit amet, consectetur adipiscing elit.',
      user: {
        id: 1,
        name: 'Mr.Jack',
      },
    },
    {
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis Lorem ipsum dolor sit amet, consectetur adipiscing elit. DuisLorem ipsum dolor sit amet, consectetur adipiscing elit.',
      user: {
        id: 1,
        name: 'Mr.Jack',
      },
    },
    {
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis Lorem ipsum dolor sit amet, consectetur adipiscing elit. DuisLorem ipsum dolor sit amet, consectetur adipiscing elit.',
      user: {
        id: 1,
        name: 'Mr.Jack',
      },
    },
    {
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis Lorem ipsum dolor sit amet, consectetur adipiscing elit. DuisLorem ipsum dolor sit amet, consectetur adipiscing elit.',
      user: {
        id: 1,
        name: 'Mr.Jack',
      },
    },
    {
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis Lorem ipsum dolor sit amet, consectetur adipiscing elit. DuisLorem ipsum dolor sit amet, consectetur adipiscing elit.',
      user: {
        id: 1,
        name: 'Mr.Jack',
      },
    },
    {
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis Lorem ipsum dolor sit amet, consectetur adipiscing elit. DuisLorem ipsum dolor sit amet, consectetur adipiscing elit.',
      user: {
        id: 1,
        name: 'Mr.Jack',
      },
    },
    {
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis Lorem ipsum dolor sit amet, consectetur adipiscing elit. DuisLorem ipsum dolor sit amet, consectetur adipiscing elit.',
      user: {
        id: 1,
        name: 'Mr.Jack',
      },
    },
  ],
  activeBids: [
    {
      id: 1,
      name: 'BCcontracting',
      note: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
      bidAmount: 150,
      rating: 3,
      totalReviews: 130,
      image: images.testImage1,
    },
    {
      id: 3,
      name: 'You',
      note: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
      bidAmount: 180,
      rating: 4,
      totalReviews: 170,
      image: images.testImage1,
    },
  ],
};

const ProjectDetailsListerScreen = ({navigation}: any) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'description', title: 'Description'},
    {key: 'question', title: 'Question'},
    {key: 'active-bids', title: 'Active bids'},
  ]);

  const favoriteOnPress = () => {};

  const backOnPress = () => {
    navigation.goBack();
  };

  const listerProfileOnPress = () => {
    navigation.navigate('ListerProfile');
  };

  function CollapsibleContent() {
    return (
      <View>
        <CustomImage
          local
          resizeMode="stretch"
          imageSource={data?.image}
          style={[styles.image, {height: HEADER_HEIGHT}]}>
          <HStack p="4" alignItems="center" justifyContent="space-between">
            <IconButton
              borderRadius="full"
              onPress={backOnPress}
              bg={Colors.WHITE_RIPPLE_COLOR}
              colorScheme={Colors.WHITE_RIPPLE_COLOR}
              icon={
                <Ionicons
                  size={24}
                  name="chevron-back"
                  color={Colors.BLACK_3}
                />
              }
            />
            <IconButton
              borderRadius="full"
              onPress={favoriteOnPress}
              bg={Colors.WHITE_RIPPLE_COLOR}
              colorScheme={Colors.WHITE_RIPPLE_COLOR}
              icon={
                <Ionicons
                  size={24}
                  name="heart-outline"
                  color={Colors.BLACK_3}
                />
              }
            />
          </HStack>
        </CustomImage>
        <VStack
          px="4"
          py="2"
          space="4"
          top={-10}
          bg={Colors.WHITE}
          borderTopRadius="2xl"
          justifyContent="center">
          <Text
            fontSize={scale(20)}
            fontFamily={fontFamily.medium}
            color={Colors.BLACK}>
            {data?.title}
          </Text>
          {/* <Center bg={Colors.WHITE} shadow="4" borderRadius="lg" py="2" px="2">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={listerProfileOnPress}
              style={styles.profileRow}>
              <HStack space="4">
                <CustomImage
                  local
                  imageSource={data?.hudur?.image}
                  style={styles.avatar}
                  resizeMode="stretch"
                />
                <VStack space="0.5" flex={1}>
                  <Text
                    fontSize={scale(16)}
                    color={Colors.BLACK_1}
                    fontFamily={fontFamily.medium}>
                    {data?.hudur?.name}
                  </Text>
                  <Text
                    fontSize={scale(12)}
                    color={Colors.PLACEHOLDER}
                    fontFamily={fontFamily.regular}>
                    {data?.hudur?.email}
                  </Text>
                </VStack>
                <VStack space="0.5" alignItems="center">
                  <RatingStar rate={data?.hudur?.rating} showRating="right" />
                  <Text
                    fontSize={scale(10)}
                    color={Colors.PLACEHOLDER}
                    fontFamily={fontFamily.regular}>
                    {`(${data?.hudur?.totalReviews} review)`}
                  </Text>
                </VStack>
              </HStack>
            </TouchableOpacity>
          </Center> */}
        </VStack>
      </View>
    );
  }

  function RenderTabBar() {
    return (
      <HStack mx="4" style={styles.tabBar}>
        {routes.map(route => {
          const focused = route.key === routes[index].key;
          return (
            <Center
              h={35}
              flex={1}
              bg={focused ? Colors.PRIMARY : Colors.TRANSPARENT}
              borderRadius={10}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  if (!focused) {
                    switch (route.key) {
                      case 'description':
                        setIndex(0);
                        break;
                      case 'question':
                        setIndex(1);
                        break;
                      case 'active-bids':
                        setIndex(2);
                        break;
                    }
                  }
                }}
                style={styles.tabBarButton}>
                <Center flex={1}>
                  <Text color={focused ? Colors.WHITE : Colors.BLACK_3}>
                    {route.title}
                  </Text>
                </Center>
              </TouchableOpacity>
            </Center>
          );
        })}
      </HStack>
    );
  }

  return (
    <CustomContainer>
      <CollapsibleTabBar
        // @ts-ignore
        selectedIndex={index}
        setSelected={setIndex}
        renderTabBar={<RenderTabBar />}
        collapsibleContent={<CollapsibleContent />}
        tabs={[
          {
            label: 'description',
            component: (
              <SectionDescriptionRouteLister data={data?.description} />
            ),
          },
          {
            label: 'question',
            component: <SectionQuestionRouteLister data={data?.questions} />,
          },
          {
            label: 'active-bids',
            component: <SectionActiveBidsRouteLister data={data?.activeBids} />,
          },
        ]}
      />
    </CustomContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.SECONDARY,
    borderRadius: 10,
    height: TABS_HEIGHT,
  },
  tabBarButton: {
    height: '100%',
    width: '100%',
  },
  header: {zIndex: 1},
  image: {
    width: '100%',
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

export default ProjectDetailsListerScreen;
