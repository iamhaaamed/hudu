import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  FlatListProps,
  StyleProp,
  StyleSheet,
  ViewProps,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import useScrollSync from '~/hooks/useScrollSync';
import {Connection} from '~/types/Connection';
import {ScrollPair} from '~/types/ScrollPair';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HeaderConfig} from '~/types/HeaderConfig';
import {Visibility} from '~/types/Visibility';
import {
  CustomContainer,
  SectionActiveBidsRoute,
  SectionDescriptionRoute,
  SectionQuestionRoute,
  TabBar,
  Header,
} from '~/components';
import {verticalScale} from '~/utils/style';
import images from '~/assets/images';
import {Colors} from '~/styles';

const data = {
  title: 'Duct need cleaned out',
  images: [images.testImage1, images.intro2],
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

const TAB_BAR_HEIGHT = verticalScale(35);
const HEADER_HEIGHT = 0;

const Tab = createMaterialTopTabNavigator();

const ProjectDetailsHudurScreen = () => {
  const {top, bottom} = useSafeAreaInsets();

  const {height: screenHeight} = useWindowDimensions();

  const descriptionRef = useRef<FlatList>(null);
  const QuestionRef = useRef<FlatList>(null);
  const ActiveBidsRef = useRef<FlatList>(null);

  const [tabIndex, setTabIndex] = useState(0);

  const [headerHeight, setHeaderHeight] = useState(0);

  const defaultHeaderHeight = top + HEADER_HEIGHT;

  const headerConfig = useMemo<HeaderConfig>(
    () => ({
      heightCollapsed: defaultHeaderHeight,
      heightExpanded: headerHeight,
    }),
    [defaultHeaderHeight, headerHeight],
  );

  const {heightCollapsed, heightExpanded} = headerConfig;

  const headerDiff = heightExpanded - heightCollapsed;

  const rendered = headerHeight > 0;

  const handleHeaderLayout = useCallback<NonNullable<ViewProps['onLayout']>>(
    event => setHeaderHeight(event.nativeEvent.layout.height),
    [],
  );

  const DescriptionScrollValue = useSharedValue(0);

  const descriptionScrollHandler = useAnimatedScrollHandler(
    event => (DescriptionScrollValue.value = event.contentOffset.y),
  );

  const QuestionScrollValue = useSharedValue(0);

  const suggestionsScrollHandler = useAnimatedScrollHandler(
    event => (QuestionScrollValue.value = event.contentOffset.y),
  );

  const ActiveBidsScrollValue = useSharedValue(0);

  const activeBidsScrollHandler = useAnimatedScrollHandler(
    event => (ActiveBidsScrollValue.value = event.contentOffset.y),
  );

  const scrollPairs = useMemo<ScrollPair[]>(
    () => [
      {list: descriptionRef, position: DescriptionScrollValue},
      {list: QuestionRef, position: QuestionScrollValue},
      {list: ActiveBidsRef, position: ActiveBidsScrollValue},
    ],
    [
      descriptionRef,
      DescriptionScrollValue,
      QuestionRef,
      QuestionScrollValue,
      ActiveBidsRef,
      ActiveBidsScrollValue,
    ],
  );

  const {sync} = useScrollSync(scrollPairs, headerConfig);

  const сurrentScrollValue = useDerivedValue(
    () =>
      tabIndex === 0
        ? DescriptionScrollValue.value
        : tabIndex === 1
        ? QuestionScrollValue.value
        : ActiveBidsScrollValue.value,
    [
      tabIndex,
      DescriptionScrollValue,
      QuestionScrollValue,
      ActiveBidsScrollValue,
    ],
  );

  const translateY = useDerivedValue(
    () => -Math.min(сurrentScrollValue.value, headerDiff),
  );

  const tabBarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
    opacity: interpolate(
      translateY.value,
      [-headerDiff, 0],
      [Visibility.Hidden, Visibility.Visible],
    ),
  }));

  const contentContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      paddingTop: rendered ? headerHeight + TAB_BAR_HEIGHT : 0,
      paddingBottom: bottom,
      minHeight: screenHeight + headerDiff,
      backgroundColor: Colors.WHITE,
    }),
    [rendered, headerHeight, bottom, screenHeight, headerDiff],
  );

  const sharedProps = useMemo<Partial<FlatListProps<Connection>>>(
    () => ({
      contentContainerStyle,
      onMomentumScrollEnd: sync,
      onScrollEndDrag: sync,
      scrollEventThrottle: 16,
      scrollIndicatorInsets: {top: heightExpanded},
    }),
    [contentContainerStyle, sync, heightExpanded],
  );

  const renderDescription = useCallback(
    () => (
      <SectionDescriptionRoute
        ref={descriptionRef}
        data={data?.description}
        onScroll={descriptionScrollHandler}
        {...sharedProps}
      />
    ),
    [descriptionRef, descriptionScrollHandler, sharedProps],
  );

  const renderQuestion = useCallback(
    () => (
      <SectionQuestionRoute
        ref={QuestionRef}
        data={data?.questions}
        onScroll={suggestionsScrollHandler}
        {...sharedProps}
      />
    ),
    [QuestionRef, suggestionsScrollHandler, sharedProps],
  );

  const renderActiveBids = useCallback(
    () => (
      <SectionActiveBidsRoute
        ref={ActiveBidsRef}
        data={data?.activeBids}
        onScroll={activeBidsScrollHandler}
        {...sharedProps}
      />
    ),
    [ActiveBidsRef, activeBidsScrollHandler, sharedProps],
  );

  const tabBarStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      rendered ? styles.tabBarContainer : undefined,
      {top: rendered ? headerHeight : undefined},
      tabBarAnimatedStyle,
    ],
    [rendered, headerHeight, tabBarAnimatedStyle],
  );

  const renderTabBar = useCallback<
    (props: MaterialTopTabBarProps) => React.ReactElement
  >(
    props => (
      <Animated.View style={tabBarStyle}>
        <TabBar onIndexChange={setTabIndex} {...props} />
      </Animated.View>
    ),
    [tabBarStyle],
  );

  const headerContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      rendered ? styles.headerContainer : undefined,
      {paddingTop: top},
      headerAnimatedStyle,
    ],

    [rendered, top, headerAnimatedStyle],
  );

  return (
    <CustomContainer>
      <Animated.View onLayout={handleHeaderLayout} style={headerContainerStyle}>
        <Header
          title={data?.title}
          images={data?.images}
          user={tabIndex === 0 ? data?.hudur : null}
        />
      </Animated.View>
      <Tab.Navigator tabBar={renderTabBar} backBehavior="firstRoute">
        <Tab.Screen name="Description">{renderDescription}</Tab.Screen>
        <Tab.Screen name="Question">{renderQuestion}</Tab.Screen>
        <Tab.Screen name="Active bids">{renderActiveBids}</Tab.Screen>
      </Tab.Navigator>
    </CustomContainer>
  );
};

export default ProjectDetailsHudurScreen;

const styles = StyleSheet.create({
  tabBarContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1,
  },
  headerContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1,
  },
});
