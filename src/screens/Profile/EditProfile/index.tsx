import React from 'react';
import {ScrollView} from 'react-native';
import {CustomContainer} from '~/components';

export default function EditProfileScreen() {
  return (
    <CustomContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 32}}></ScrollView>
    </CustomContainer>
  );
}
