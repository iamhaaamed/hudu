import React, {useState, useRef} from 'react';
import {StyleSheet, Dimensions, Animated, TouchableOpacity} from 'react-native';
import {Center, VStack, Text, HStack, IconButton} from 'native-base';
import {TabView, TabBar} from 'react-native-tab-view';
import images from '~/assets/images';
import {
  CustomContainer,
  CustomImage,
  RatingStar,
  SectionDescriptionRoute,
  SectionQuestionRoute,
  SectionActiveBidsRoute,
} from '~/components';
import {Colors} from '~/styles';
import {scale, fontFamily} from '~/utils/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  HEADER_HEIGHT,
  DESCRIPTION_TOP,
  OTHER_TOP,
  TABS_HEIGHT,
} from '~/styles/spacing';

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

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const ProjectDetailsHudurScreen = ({route: inRoute, navigation}: any) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'description', title: 'Description'},
    {key: 'question', title: 'Question'},
    {key: 'active-bids', title: 'Active bids'},
  ]);

  const position: any = useRef(new Animated.Value(0)).current;
  const isValidTabPress: any = useRef(false);
  const descriptionRef: any = useRef();
  const questionRef: any = useRef();
  const activeBidsRef: any = useRef();

  const onMomentumScrollBegin = () => {
    isValidTabPress.current = true;
  };

  const favoriteOnPress = () => {};

  const backOnPress = () => {
    navigation.goBack();
  };

  const listerProfileOnPress = () => {
    navigation.navigate('ListerProfile');
  };

  const syncOffset = (scene: any, y: any) => {
    if (scene === 'description') {
      descriptionRef?.current?.scrollToOffset({
        offset: y,
        animated: false,
      });
    }
    if (scene === 'question') {
      questionRef?.current?.scrollToOffset({
        offset: y,
        animated: false,
      });
    }
    if (scene === 'active-bids') {
      activeBidsRef?.current?.scrollToOffset({
        offset: y,
        animated: false,
      });
    }
    isValidTabPress.current = false;
  };

  const renderScene = ({route}: any) => {
    switch (route.key) {
      case 'description':
        return (
          <SectionDescriptionRoute
            key={route.key}
            position={position}
            syncOffset={syncOffset}
            descriptionRef={descriptionRef}
            onMomentumScrollBegin={onMomentumScrollBegin}
            data={data?.description}
          />
        );
      case 'question':
        return (
          <SectionQuestionRoute
            key={route.key}
            position={position}
            syncOffset={syncOffset}
            questionRef={questionRef}
            onMomentumScrollBegin={onMomentumScrollBegin}
            data={data?.questions}
          />
        );
      case 'active-bids':
        return (
          <SectionActiveBidsRoute
            key={route.key}
            position={position}
            syncOffset={syncOffset}
            activeBidsRef={activeBidsRef}
            onMomentumScrollBegin={onMomentumScrollBegin}
            data={data?.activeBids}
          />
        );
      default:
        return null;
    }
  };

  const renderTabBarItem = ({route}: any) => {
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
  };

  function renderTabBar(props: any) {
    const translateY = position.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [
        0,
        index === 0
          ? -HEADER_HEIGHT + DESCRIPTION_TOP
          : -HEADER_HEIGHT + OTHER_TOP,
      ],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
        <CustomImage
          local
          style={[styles.image, {height: HEADER_HEIGHT}]}
          resizeMode="stretch"
          imageSource={data?.image}>
          <HStack p="4" alignItems="center" justifyContent="space-between">
            <IconButton
              onPress={backOnPress}
              bg={Colors.WHITE_RIPPLE_COLOR}
              colorScheme={Colors.WHITE_RIPPLE_COLOR}
              borderRadius="full"
              icon={
                <Ionicons
                  name="chevron-back"
                  color={Colors.BLACK_3}
                  size={24}
                />
              }
            />
            <IconButton
              onPress={favoriteOnPress}
              bg={Colors.WHITE_RIPPLE_COLOR}
              colorScheme={Colors.WHITE_RIPPLE_COLOR}
              borderRadius="full"
              icon={
                <Ionicons
                  name="heart-outline"
                  color={Colors.BLACK_3}
                  size={24}
                />
              }
            />
          </HStack>
        </CustomImage>
        <VStack
          bg={Colors.WHITE}
          borderTopRadius="2xl"
          px="4"
          py="2"
          space="4"
          justifyContent="center"
          top={index === 0 ? -DESCRIPTION_TOP : -OTHER_TOP}>
          <Text
            fontSize={scale(20)}
            fontFamily={fontFamily.medium}
            color={Colors.BLACK}>
            {data?.title}
          </Text>
          {index === 0 && (
            <Center
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
            </Center>
          )}
          <TabBar
            {...props}
            renderTabBarItem={renderTabBarItem}
            renderIndicator={() => <></>}
            style={styles.tabBar}
          />
        </VStack>
      </Animated.View>
    );
  }

  return (
    <CustomContainer>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
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
  header: {position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1},
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

export default ProjectDetailsHudurScreen;
