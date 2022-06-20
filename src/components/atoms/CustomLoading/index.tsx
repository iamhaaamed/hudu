import React from 'react';
import {Colors} from '~/styles';
import {ActivityIndicator, StyleSheet, View, ViewStyle} from 'react-native';

const CustomLoading = ({style = styles.loading}: {style?: ViewStyle}) => {
  return (
    <View style={style}>
      <ActivityIndicator size={28} color={Colors.PRIMARY} />
    </View>
  );
};

export default CustomLoading;

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  loading: {
    flex: 1,
    zIndex: 999,
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
});
