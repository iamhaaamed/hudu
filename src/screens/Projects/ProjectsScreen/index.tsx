import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Center, HStack, Text, VStack} from 'native-base';
import {
  CustomContainer,
  SectionListerProjects,
  SectionHuduUrProjects,
  CustomIconButton,
} from '~/components';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import PagerView from 'react-native-pager-view';
import {authStore} from '~/stores';
import {navigate} from '~/navigation/Methods';

const tabData = ['As lister', 'As HUDUr'];

const ProjectsScreen = ({route}: {route: any}) => {
  const {pageNumber} = route?.params;
  const {isUserLoggedIn} = authStore(state => state);
  const [page, setPage] = useState<number>(pageNumber);
  const viewPager = useRef(null);

  useEffect(() => {
    move(pageNumber);
  }, [pageNumber]);

  const move = (currentPage: number) => {
    viewPager.current.setPage(currentPage);
  };

  const loginHandler = () => {
    navigate('AuthStack');
  };

  return (
    <CustomContainer>
      <HStack
        m="4"
        h={verticalScale(35)}
        alignItems="center"
        borderRadius="lg"
        bg={Colors.SECONDARY}>
        {tabData.map((itm: any, indx: number) => {
          const isActive = indx === page;
          return (
            <TouchableOpacity
              key={`itm${indx}`}
              activeOpacity={0.7}
              onPress={() => move(indx)}
              style={styles.flex1}>
              <Center
                flex={1}
                borderRadius="lg"
                bg={isActive ? Colors.PRIMARY : Colors.TRANSPARENT}>
                <Text
                  fontSize={scale(14)}
                  fontFamily={fontFamily.regular}
                  color={isActive ? Colors.WHITE : Colors.BLACK_3}>
                  {itm}
                </Text>
              </Center>
            </TouchableOpacity>
          );
        })}
      </HStack>
      <PagerView
        style={styles.flex1}
        ref={viewPager}
        initialPage={0}
        scrollEnabled={false}
        onPageSelected={e => setPage(e.nativeEvent.position)}>
        {isUserLoggedIn ? (
          <>
            {tabData.map((item: any, index: number) => {
              switch (item) {
                case 'As lister':
                  return <SectionListerProjects key={index + 1} />;
                case 'As HUDUr':
                  return <SectionHuduUrProjects key={index + 2} />;
                default:
                  return;
              }
            })}
          </>
        ) : (
          <VStack space="3" alignItems="center" justifyContent="center">
            <Text
              fontSize={scale(16)}
              fontFamily={fontFamily.medium}
              color={Colors.BLACK_3}>
              Log in to use the app features
            </Text>
            <CustomIconButton
              name="log-in-outline"
              title="Log in"
              onPress={loginHandler}
            />
          </VStack>
        )}
      </PagerView>
    </CustomContainer>
  );
};

export default ProjectsScreen;

const styles = StyleSheet.create({
  flex1: {flex: 1},
});
