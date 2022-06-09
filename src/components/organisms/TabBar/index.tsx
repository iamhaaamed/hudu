import React, {FC, useEffect} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Center, HStack, VStack, Text} from 'native-base';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {Colors} from '~/styles';
import {verticalScale} from '~/utils/style';

type Props = MaterialTopTabBarProps & {
  onIndexChange?: (index: number) => void;
};

const TabBar: FC<Props> = ({onIndexChange, ...props}) => {
  const {state, descriptors, navigation} = props;
  const {index} = state;

  useEffect(() => {
    onIndexChange?.(index);
  }, [onIndexChange, index]);

  return (
    <VStack>
      <HStack
        mx="4"
        borderRadius="lg"
        h={verticalScale(35)}
        alignItems="center"
        bg={Colors.SECONDARY}>
        {state.routes.map((route: any, itemIndex: number) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === itemIndex;

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

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Center
              key={route.key}
              h="100%"
              flex={1}
              bg={isFocused ? Colors.PRIMARY : Colors.TRANSPARENT}
              borderRadius="lg">
              <TouchableOpacity
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabBarButton}>
                <Center flex={1}>
                  <Text color={isFocused ? Colors.WHITE : Colors.BLACK_3}>
                    {label}
                  </Text>
                </Center>
              </TouchableOpacity>
            </Center>
          );
        })}
      </HStack>
    </VStack>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabBarButton: {
    height: '100%',
    width: '100%',
  },
});

// const TabBar: FC<Props> = ({onIndexChange, ...props}) => {
//   const {index} = props.state;

//   useEffect(() => {
//     onIndexChange?.(index);
//   }, [onIndexChange, index]);

//   return <MaterialTopTabBar {...props} />;
// };

// export default TabBar;
