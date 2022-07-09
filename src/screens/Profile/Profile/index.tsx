import {useIsFocused} from '@react-navigation/native';
import {Box} from 'native-base';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {CustomContainer, ProfileInfo, ProfileLinks} from '~/components';
import {useGetMeProfile} from '~/hooks/user';
import {authStore} from '~/stores';
import {Colors} from '~/styles';

const ProfileScreen = () => {
  const isFocused = useIsFocused();
  const {isUserLoggedIn} = authStore(state => state);

  const {
    isLoading: getProfileLoading,
    data: getProfile,
    refetch,
  } = useGetMeProfile({
    enabled: isUserLoggedIn,
  });

  React.useLayoutEffect(() => {
    refetch();
  }, [isFocused]);

  const profile = getProfile?.user_getProfile?.result ?? {};

  return (
    <CustomContainer isLoading={getProfileLoading}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <Box
          p={4}
          pt="30%"
          shadow="5"
          width="90%"
          marginTop={24}
          borderRadius={8}
          bg={Colors.WHITE}
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
