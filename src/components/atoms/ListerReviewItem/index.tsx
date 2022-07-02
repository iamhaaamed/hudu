import React from 'react';
import {Colors} from '~/styles';
import {HStack, Text, VStack, Divider} from 'native-base';
import {RatingStar} from '~/components';
import {fontFamily, scale, verticalScale} from '~/utils/style';

export default function HudurReviewItem({
  item,
  index,
  arrayLength,
}: {
  item: any;
  index: number;
  arrayLength: number;
}) {
  return (
    <VStack>
      <HStack space="1" minHeight={verticalScale(66)}>
        <VStack mr="2">
          <Text
            fontSize={scale(13)}
            fontFamily={fontFamily.regular}
            color={Colors.BLACK_1}>
            {item?.hudu?.userName}
          </Text>
        </VStack>
        <VStack flex={1}>
          <Text
            fontSize={scale(13)}
            fontFamily={fontFamily.regular}
            numberOfLines={3}
            color={Colors.PLACEHOLDER}>
            {item?.hudusComment}
          </Text>
        </VStack>
        <VStack>
          <RatingStar
            disabled
            rate={item?.hudusRate}
            showRating="right"
            size={12}
          />
        </VStack>
      </HStack>
      {index < arrayLength - 1 && <Divider my="2" />}
    </VStack>
  );
}
