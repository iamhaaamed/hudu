import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Text, VStack} from 'native-base';
import {Colors} from '~/styles';
import {fontFamily, scale} from '~/utils/style';
import {CustomImage, RatingStar} from '~/components';

export default function ProfileInfo({data}: {data: any}) {
  const totalReview = useMemo(() => {
    const listerCounts = data?.listersWhoRatedToMeCount;
    const hudurCounts = data?.huduersWhoRatedToMeCount;
    const reviews = Number(listerCounts) + Number(hudurCounts);
    return reviews ? reviews : 0;
  }, [data]);

  return (
    <VStack
      top={-50}
      alignSelf="center"
      position="absolute"
      alignItems="center"
      space="1">
      <CustomImage
        style={styles.avatar}
        imageSource={data?.imageAddress}
        resizeMode="stretch"
      />
      <Text fontFamily={fontFamily.bold}>{data?.userName}</Text>
      <Text fontFamily={fontFamily.regular} color={Colors.GARY_3}>
        {data?.email}
      </Text>
      <RatingStar
        disabled
        rate={data?.averageRate}
        showRating="right"
        size={14}
        total={totalReview}
      />
    </VStack>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: scale(105),
    width: scale(105),
    borderRadius: 100,
  },
});
