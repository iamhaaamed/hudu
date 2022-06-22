import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, VStack} from 'native-base';
import {
  CustomContainer,
  SectionUserRow,
  SectionSearchBox,
  SectionProjects,
} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {authStore} from '~/stores';
import {useGetProfile} from '~/hooks/user';

const HomeScreen = ({navigation}: {navigation: any}) => {
  const {isUserLoggedIn} = authStore(state => state);

  const {isLoading: getProfileLoading, data: getProfile} = useGetProfile({
    enabled: isUserLoggedIn,
  });

  const profile = getProfile?.user_getProfile?.result ?? {};

  const questionHandler = () => {
    navigation.navigate('AuthStack', {screen: 'Support'});
  };

  return (
    <CustomContainer>
      <VStack space="3" py="2" flex={1}>
        {isUserLoggedIn && (
          <SectionUserRow {...{data: profile, loading: getProfileLoading}} />
        )}
        <SectionSearchBox />
        <SectionProjects />
      </VStack>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={questionHandler}
        style={styles.floatActionButton}>
        <Text
          fontSize={scale(14)}
          color={Colors.WHITE}
          fontFamily={fontFamily.regular}>
          Got a question?
        </Text>
      </TouchableOpacity>
    </CustomContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {flexGrow: 1},
  floatActionButton: {
    backgroundColor: Colors.PRIMARY,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    bottom: verticalScale(18),
    paddingHorizontal: scale(30),
    paddingVertical: 6,
    zIndex: 100,
  },
});
