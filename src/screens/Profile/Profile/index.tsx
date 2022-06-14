import {Box} from 'native-base';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {CustomContainer, ProfileInfo, ProfileLinks} from '~/components';
import {useGetProfile} from '~/hooks/user';
import {authStore} from '~/stores';
import {Colors} from '~/styles';

const ProfileScreen = () => {
  const {isUserLoggedIn} = authStore(state => state);

  const {isLoading: getProfileLoading, data: getProfile} = useGetProfile({
    enabled: isUserLoggedIn,
  });

  const profile = getProfile?.user_getProfile?.result ?? {};

  return (
    <CustomContainer isLoading={getProfileLoading}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <Box
          p={4}
          pt="30%"
          bg={Colors.WHITE}
          shadow="5"
          width="90%"
          marginTop={24}
          borderRadius={8}
          alignSelf="center">
          <ProfileInfo data={profile} />
          <ProfileLinks />
        </Box>
      </ScrollView>
    </CustomContainer>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {paddingBottom: 32},
});
