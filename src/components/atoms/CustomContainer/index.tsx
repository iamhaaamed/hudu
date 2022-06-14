import React from 'react';
import {Colors} from '~/styles';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {CustomLoading} from '~/components';

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
      {isLoading && <CustomLoading />}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1},
});
