import React from 'react';
import {ScrollView} from 'react-native';
import {CustomContainer, SectionProfile} from '~/components';

const ProfileScreen = () => {
  return (
    <CustomContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 32}}>
        <SectionProfile />
      </ScrollView>
    </CustomContainer>
  );
};

export default ProfileScreen;
