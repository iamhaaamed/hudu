// @ts-nocheck

import {map, min} from 'lodash';
import React, {Component} from 'react';
import Carousel from 'react-native-snap-carousel';
import {View, Dimensions, Animated, ScrollView} from 'react-native';

const headerCollapsedHeight = 46;
const {width: screenWidth} = Dimensions.get('screen');

class CollapsibleTabs extends Component {
  scrolls = [];

  constructor(props) {
    super(props);
    this.headerExpandedHeight = headerCollapsedHeight;
    this.state = {
      scrollY: new Animated.Value(0),
      selectedTab: 0,
    };
  }

  componentDidUpdate(prevProps) {
    //Typical usage, don't forget to compare the props
    if (this.props.selectedIndex !== prevProps.selectedIndex) {
      this.onChangePage(this.props.selectedIndex);
    }
  }

  onChangePage(index) {
    const {scrollY} = this.state;
    Animated.timing(scrollY, {
      toValue: min([this.scrolls[index] || 0, this.headerExpandedHeight]),
      duration: 200,
      useNativeDriver: true,
    }).start();

    this.props.setSelected(index);
    this.carousel.snapToItem(index);
    this.setState({selectedTab: index});
  }

  render() {
    const {scrollY} = this.state;
    const {headerExpandedHeight} = this;
    const {collapsibleContent, tabs, renderTabBar} = this.props;

    const headerHeight = scrollY.interpolate({
      inputRange: [0, headerExpandedHeight - headerCollapsedHeight],
      outputRange: [0, -(headerExpandedHeight - headerCollapsedHeight)],
      extrapolate: 'clamp',
    });

    const scrollProps = index => ({
      contentContainerStyle: {paddingTop: headerExpandedHeight},
      scrollEventThrottle: 16,
      onScroll: Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                y: this.state.scrollY,
              },
            },
          },
        ],
        {
          listener: ({nativeEvent}) =>
            (this.scrolls[index] = nativeEvent.contentOffset.y),
        },
      ),
    });

    return (
      <View style={styles.flex}>
        <Carousel
          data={tabs}
          style={styles.flex}
          inactiveSlideScale={1}
          itemWidth={screenWidth}
          sliderWidth={screenWidth}
          ref={ref => (this.carousel = ref)}
          onSnapToItem={index => this.onChangePage(index)}
          renderItem={({item: {component, isFlatList}, index}) =>
            isFlatList ? (
              React.cloneElement(component, scrollProps(index))
            ) : (
              <ScrollView {...scrollProps(index)}>{component}</ScrollView>
            )
          }
        />
        {/* HEADER */}
        <Animated.View
          style={{
            top: 0,
            left: 0,
            right: 0,
            position: 'absolute',
            transform: [{translateY: headerHeight}],
          }}
          onLayout={({nativeEvent}) => {
            if (this.headerExpandedHeight === headerCollapsedHeight) {
              this.forceUpdate();
            }
            this.headerExpandedHeight = nativeEvent.layout.height + 0.1;
          }}>
          {collapsibleContent}
          <View style={{height: headerCollapsedHeight}} />
          <View style={styles.tabsContainer}>{renderTabBar}</View>
        </Animated.View>
      </View>
    );
  }
}

const styles = {
  flex: {flex: 1},
  tabsContainer: {
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'stretch',
  },
};

export default CollapsibleTabs;
