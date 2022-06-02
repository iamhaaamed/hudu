import React from 'react';
import {
  Platform,
  StatusBar,
  ViewStyle,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '~/styles';

export default function CustomContainer({
  children,
  isLoading = false,
  style,
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
      {/* {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />} */}
      {children}
    </View>
  );
}

const Loading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size={'large'} color={Colors.PRIMARY} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  loading: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.4)',
    zIndex: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
