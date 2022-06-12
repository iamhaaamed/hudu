import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, VStack} from 'native-base';
import {
  CustomKeyboardAwareScrollView,
  CustomContainer,
  SectionUserRow,
  SectionSearchBox,
  SectionProjects,
} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, scale, verticalScale} from '~/utils/style';

const HomeScreen = ({navigation}: {navigation: any}) => {
  const questionHandler = () => {
    navigation.navigate('ProfileStack', {screen: 'Support'});
  };

  return (
    <CustomContainer>
      <CustomKeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <VStack space="3" py="2" flex={1}>
          <SectionUserRow />
          <SectionSearchBox />
          <SectionProjects />
        </VStack>
      </CustomKeyboardAwareScrollView>
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
