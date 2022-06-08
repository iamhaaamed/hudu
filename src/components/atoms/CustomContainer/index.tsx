import React from 'react';
import {Colors} from '~/styles';
import {ActivityIndicator, StyleSheet, View, ViewStyle} from 'react-native';

export default function CustomContainer({
  style,
  children,
  isLoading = false,
  backgroundColor = Colors.WHITE,
}: {
  children: any;
  isLoading?: boolean;
  style?: ViewStyle;
  backgroundColor?: string;
}) {
  return (
    <View style={[styles.safeArea, style, {backgroundColor: backgroundColor}]}>
      {isLoading && <Loading />}
      {children}
    </View>
  );
}

const Loading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size={28} color={Colors.PRIMARY} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  loading: {
    flex: 1,
    zIndex: 100,
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
});
