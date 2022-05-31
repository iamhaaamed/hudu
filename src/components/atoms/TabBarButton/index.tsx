import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {verticalScale} from '~/utils/style';

const TabBarButton = (props: any) => {
  const {onPress, children, style = styles.container} = props;

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(50),
  },
  label: {fontSize: verticalScale(14)},
});
