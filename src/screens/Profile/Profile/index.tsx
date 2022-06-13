import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {CustomContainer, SectionProfile} from '~/components';

const ProfileScreen = () => {
  return (
    <CustomContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <SectionProfile />
      </ScrollView>
    </CustomContainer>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {paddingBottom: 32},
});
