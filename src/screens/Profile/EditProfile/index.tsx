import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {CustomContainer, ProfilePicker} from '~/components';

export default function EditProfileScreen() {
  return (
    <CustomContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <ProfilePicker />
      </ScrollView>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    paddingBottom: 32,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
