import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Box} from 'native-base';
import {AuthProfileLinks, CustomContainer} from '~/components';
import {Colors} from '~/styles';

const AuthProfileScreen = () => {
  return (
    <CustomContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <Box
          px="4"
          pb="6"
          bg={Colors.WHITE}
          shadow="5"
          width="90%"
          borderRadius={8}
          alignSelf="center">
          <AuthProfileLinks />
        </Box>
      </ScrollView>
    </CustomContainer>
  );
};

export default AuthProfileScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: 32,
    flexGrow: 1,
    justifyContent: 'center',
  },
});
