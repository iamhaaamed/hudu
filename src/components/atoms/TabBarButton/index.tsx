import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '~/styles';
import {verticalScale} from '~/utils/style';

const TabBarButton = (props: any) => {
  const {
    onPress,
    isFocused,
    icon,
    activeColor = Colors.PRIMARY,
    inActiveColor = Colors.WHITE,
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: isFocused ? inActiveColor : activeColor,
        },
      ]}>
      <MaterialCommunityIcon
        name={icon}
        size={28}
        color={isFocused ? activeColor : inActiveColor}
      />
    </TouchableOpacity>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: verticalScale(5),
    marginRight: 0.7,
    height: verticalScale(55),
    paddingVertical: 2,
  },
  label: {fontSize: verticalScale(14)},
});
