import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '~/styles';
import {TabBarButton} from '~/components';

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: {
  state?: any;
  descriptors?: any;
  navigation?: any;
}) => {
  return (
    <View
      style={[styles.container, {backgroundColor: Colors.TAB_BAR_BACKGROUND}]}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];

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

        const icon =
          options.tabBarIcon !== undefined ? options.tabBarIcon : null;

        return (
          <TabBarButton
            key={`key${index}`}
            onPress={onPress}
            isFocused={isFocused}
            icon={icon}
          />
        );
      })}
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
