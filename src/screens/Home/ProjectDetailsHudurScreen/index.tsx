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
import {useIsFocused} from '@react-navigation/native';
import useScrollSync from '~/hooks/useScrollSync';
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
  CustomLoading,
} from '~/components';
import {verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import {useGetProject, useGetQuestions} from '~/hooks/project';
import {useGetBids} from '~/hooks/bid';
import {Center} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const TAB_BAR_HEIGHT = verticalScale(35);
const HEADER_HEIGHT = 0;

const Tab = createMaterialTopTabNavigator();

const ProjectDetailsHudurScreen = ({route}: {route: any}) => {
  const isFocused = useIsFocused();
  const {projectId} = route?.params;

  const getBidsOption = {
    projectFilter: 'NEWEST_TO_OLDEST',
    location: [12, 12],
    where: {projectId: {eq: projectId}},
  };
  const getQuestionsOptions = {
    where: {and: [{projectId: {eq: projectId}}, {parentId: {eq: null}}]},
  };

  const {isLoading: getProjectLoading, data: getProject} = useGetProject({
    projectId,
  });
  const {isLoading: getBidsLoading, data: getBids} = useGetBids(getBidsOption);
  const {
    isLoading: getQuestionLoading,
    data: getQuestions,
    isRefetching: isRefetchingQuestions,
  } = useGetQuestions(getQuestionsOptions);

  const bids = getBids?.pages ?? [];
  const questions = getQuestions?.pages ?? [];

  const project = getProject?.project_getProject?.result ?? {};

  const {top, bottom} = useSafeAreaInsets();

  const {height: screenHeight} = useWindowDimensions();

  const descriptionRef = useRef<FlatList>(null);
  const QuestionRef = useRef<FlatList>(null);
  const ActiveBidsRef = useRef<FlatList>(null);

  const [tabIndex, setTabIndex] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  React.useLayoutEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isFocused]);

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

  const sharedProps = useMemo<Partial<FlatListProps<any>>>(
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
        data={project?.project}
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
        data={questions}
        listerId={project?.project?.userId}
        projectId={projectId}
        onScroll={suggestionsScrollHandler}
        isRefetching={isRefetchingQuestions}
        {...sharedProps}
      />
    ),
    [
      QuestionRef,
      suggestionsScrollHandler,
      sharedProps,
      questions,
      project,
      projectId,
    ],
  );

  const renderActiveBids = useCallback(
    () => (
      <SectionActiveBidsRoute
        ref={ActiveBidsRef}
        data={bids}
        projectStatus={project?.project?.projectStatus}
        onScroll={activeBidsScrollHandler}
        {...sharedProps}
      />
    ),
    [ActiveBidsRef, activeBidsScrollHandler, sharedProps, bids],
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

  const loading = getProjectLoading || getBidsLoading || getQuestionLoading;

  if (isLoading) {
    return (
      <Center flex={1}>
        <CustomLoading />
      </Center>
    );
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentContainerStyle}>
      <CustomContainer isLoading={loading}>
        <Animated.View
          onLayout={handleHeaderLayout}
          style={headerContainerStyle}>
          <Header
            title={project?.project?.title}
            images={project?.project?.projectImages}
            user={tabIndex === 0 ? project?.project?.user : null}
            isLiked={project?.isLiked}
            projectId={project?.project?.id}
          />
        </Animated.View>
        <Tab.Navigator tabBar={renderTabBar} backBehavior="firstRoute">
          <Tab.Screen name="Description">{renderDescription}</Tab.Screen>
          <Tab.Screen name="Questions">{renderQuestion}</Tab.Screen>
          <Tab.Screen name="Active bids">{renderActiveBids}</Tab.Screen>
        </Tab.Navigator>
      </CustomContainer>
    </KeyboardAwareScrollView>
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
  contentContainerStyle: {flex: 1},
});
