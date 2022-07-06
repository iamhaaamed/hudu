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

const CustomTabBar = ({state, navigation}: {state?: any; navigation?: any}) => {
  return (
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
              <TabBarButton
                key={route.name}
                onPress={onPress}
                text="Home"
                isFocused={isFocused}>
                {isFocused ? <HomeIconFill /> : <HomeIcon />}
              </TabBarButton>
            );
          case 'FavoriteStack':
            return (
              <TabBarButton
                key={route.name}
                onPress={onPress}
                text="Favorites"
                isFocused={isFocused}>
                {isFocused ? <FavoriteIconFill /> : <FavoriteIcon />}
              </TabBarButton>
            );
          case 'PostStack':
            return (
              <TabBarButton
                key={route.name}
                onPress={onPress}
                text="Post"
                isFocused={isFocused}>
                {isFocused ? <PlusIconFill /> : <PlusIcon />}
              </TabBarButton>
            );
          case 'ProjectsStack':
            return (
              <TabBarButton
                key={route.name}
                onPress={onPress}
                text="Projects"
                isFocused={isFocused}>
                {isFocused ? <ProjectsIconFill /> : <ProjectsIcon />}
              </TabBarButton>
            );
          case 'ProfileStack':
            return (
              <TabBarButton
                key={route.name}
                onPress={onPress}
                text="MyHUDU"
                isFocused={isFocused}>
                {isFocused ? <HuduIconFill /> : <HuduIcon />}
              </TabBarButton>
            );

          default:
            return;
        }
      })}
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 55,
    backgroundColor: Colors.WHITE_F,
    alignItems: 'center',
  },
});
