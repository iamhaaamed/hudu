import React from 'react';
import {StyleSheet} from 'react-native';
import {VStack} from 'native-base';
import {
  CustomKeyboardAwareScrollView,
  CustomContainer,
  SectionUserRow,
  SectionSearchBox,
  SectionProjects,
} from '~/components';

const HomeScreen = () => {
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
    </CustomContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {flexGrow: 1},
});
