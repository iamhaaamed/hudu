import React from 'react';
import {Colors} from '~/styles';
import {TabBarButton} from '~/components';
import {View, StyleSheet} from 'react-native';
import {
  PlusIcon,
  PlusIconFill,
  HomeIcon,
  HomeIconFill,
  FavoriteIcon,
  FavoriteIconFill,
  ProjectsIcon,
  ProjectsIconFill,
  HuduIcon,
  HuduIconFill,
} from '~/assets/icons';
import {useTabBar} from '~/context/TabBarContext';

const CustomTabBar = ({state, navigation}: {state?: any; navigation?: any}) => {
  const {hideTabBar} = useTabBar();

  return (
    <View
      style={[
        styles.main,
        {
          display: hideTabBar ? 'none' : 'flex',
        },
      ]}>
      <View style={styles.container}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          switch (route.name) {
            case 'HomeStack':
              return (
                <TabBarButton key={route.name} onPress={onPress}>
                  {isFocused ? <HomeIconFill /> : <HomeIcon />}
                </TabBarButton>
              );
            case 'FavoriteStack':
              return (
                <TabBarButton key={route.name} onPress={onPress}>
                  {isFocused ? <FavoriteIconFill /> : <FavoriteIcon />}
                </TabBarButton>
              );
            case 'PostStack':
              return (
                <TabBarButton
                  style={styles.tabBarButton}
                  key={route.name}
                  onPress={onPress}>
                  {isFocused ? <PlusIconFill /> : <PlusIcon />}
                </TabBarButton>
              );
            case 'ProjectsStack':
              return (
                <TabBarButton key={route.name} onPress={onPress}>
                  {isFocused ? <ProjectsIconFill /> : <ProjectsIcon />}
                </TabBarButton>
              );
            case 'ProfileStack':
              return (
                <TabBarButton key={route.name} onPress={onPress}>
                  {isFocused ? <HuduIconFill /> : <HuduIcon />}
                </TabBarButton>
              );

            default:
              return;
          }
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'flex-end',
    backgroundColor: Colors.TAB_BAR_BACKGROUND,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  tabBarButton: {
    flex: 1,
    height: 62,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  main: {backgroundColor: Colors.WHITE},
});
