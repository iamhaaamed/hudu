import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {Colors} from '~/styles';
import {verticalScale, fontFamily} from '~/utils/style';

const TabBarButton = (props: any) => {
  const {onPress, children, style = styles.container, text, isFocused} = props;

  const textColor = isFocused ? Colors.PRIMARY : Colors.TAB_BAR_ICON;

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={style}>
      <View style={styles.button}>
        {isFocused && <View style={styles.topLine} />}
      </View>
      <View style={styles.activeLine}>
        {children}
        <Text style={[styles.text, {color: textColor}]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: 55,
  },
  button: {
    height: 0.7,
    backgroundColor: Colors.INPUT_LABEL2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontFamily: fontFamily.light,
  },
  label: {fontSize: verticalScale(14)},
  topLine: {
    width: '70%',
    height: 1.8,
    backgroundColor: Colors.PRIMARY,
  },
  activeLine: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
