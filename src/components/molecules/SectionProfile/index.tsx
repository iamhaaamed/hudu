import React from 'react';
import {Box} from 'native-base';
import ProfileInfo from '~/components/atoms/ProfileInfo';
import ProfileLinks from '~/components/atoms/ProfileInfo/profile-links';
import {Colors} from '~/styles';

export default function SectionProfile() {
  return (
    <Box
      p={4}
      pt="30%"
      bg={Colors.WHITE}
      shadow="5"
      width="90%"
      marginTop={24}
      borderRadius={8}
      alignSelf="center">
      <ProfileInfo />
      <ProfileLinks />
    </Box>
  );
}
