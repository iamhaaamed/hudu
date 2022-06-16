import React from 'react';
import {Colors} from '~/styles';
import {
  CustomContainer,
  SectionHudurReviews,
  SectionListerReviews,
} from '~/components';
import PagerView from 'react-native-pager-view';
import {Center, HStack, Text} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {fontFamily, scale, verticalScale} from '~/utils/style';

const tabData = ['As lister', 'As HUDUr'];

export default function ReviewsScreen(props: NavigationProp) {
  const viewPager = React.useRef<PagerView>(null);
  const [page, setPage] = React.useState<number>(0);

  const move = (currentPage: number) =>
    viewPager?.current?.setPage(currentPage);

  return (
    <CustomContainer>
      <HStack
        m="4"
        borderRadius="lg"
        alignItems="center"
        h={verticalScale(35)}
        bg={Colors.SECONDARY}>
        {tabData.map((item: any, index: number) => {
          const isActive = index === page;
          return (
            <TouchableOpacity
              key={item}
              style={styles.flex1}
              activeOpacity={0.7}
              onPress={() => move(index)}>
              <Center
                flex={1}
                borderRadius="lg"
                bg={isActive ? Colors.PRIMARY : Colors.TRANSPARENT}>
                <Text
                  fontSize={scale(14)}
                  fontFamily={fontFamily.regular}
                  color={isActive ? Colors.WHITE : Colors.BLACK_3}>
                  {item}
                </Text>
              </Center>
            </TouchableOpacity>
          );
        })}
      </HStack>
      <PagerView
        ref={viewPager}
        initialPage={0}
        style={styles.flex1}
        onPageSelected={e => setPage(e.nativeEvent.position)}>
        {tabData.map((item: any, index: number) => {
          switch (item) {
            case 'As lister':
              return <SectionListerReviews key={`lister${index}`} />;
            case 'As HUDUr':
              return <SectionHudurReviews key={`hudur${index}`} />;
            default:
              return;
          }
        })}
      </PagerView>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  flex1: {flex: 1},
});
