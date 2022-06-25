import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Box, VStack, HStack} from 'native-base';
import {Colors} from '~/styles';
import {CustomImage, ProjectFavoriteIcon, TimeLeftLabel} from '~/components';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {navigate} from '~/navigation/Methods';

const SearchProjectItem = ({
  item,
  userQuery,
}: {
  item?: any;
  userQuery?: any;
}) => {
  const lowBid = useMemo(() => {
    let res = -1;
    if (item?.project?.bids?.length > 0) {
      res = Math.min.apply(
        Math,
        item?.project?.bids?.map(function (object: any) {
          return object?.amount;
        }),
      );
    }
    return res;
  }, [item]);

  const onPressHandler = () => {
    navigate('ProjectDetailsHudur', {projectId: item?.project?.id});
  };

  const getHighlightedText = (
    text: any,
    highlight: any,
    fontSize: number = scale(11),
  ) => {
    const parts = text?.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <Text fontSize={fontSize}>
        {' '}
        {parts.map((part: any, i: number) => (
          <Text
            key={i}
            fontFamily={
              part.toLowerCase() === highlight?.toLowerCase()
                ? fontFamily.bold
                : fontFamily.regular
            }
            color={
              part.toLowerCase() === highlight?.toLowerCase()
                ? Colors.BLACK_3
                : Colors.PLACEHOLDER
            }>
            {part}
          </Text>
        ))}{' '}
      </Text>
    );
  };

  return (
    <Box
      mb="4"
      w="48%"
      h={verticalScale(268)}
      shadow="4"
      borderRadius="md"
      bg={Colors.WHITE}>
      <CustomImage
        imageSource={item?.project?.projectImages?.[0]?.imageAddress}
        style={styles.image}
        resizeMode="stretch">
        <VStack flex={1} justifyContent="space-between">
          <HStack w="100%" px="2" py="2">
            <ProjectFavoriteIcon
              {...{isLiked: item?.isLiked, projectId: item?.project?.id}}
            />
          </HStack>
          <TimeLeftLabel {...{time: item?.project?.projectDeadLine}} />
        </VStack>
      </CustomImage>
      <TouchableOpacity
        style={styles.flex1}
        activeOpacity={0.7}
        onPress={onPressHandler}>
        <VStack py="2" px="2" space="2" flex={1}>
          {item?.project?.title &&
            getHighlightedText(item?.project?.title, userQuery, scale(14))}
          {item?.project?.description &&
            getHighlightedText(item?.project?.description, userQuery)}
        </VStack>
        <HStack pb="2" px="2" justifyContent="space-between">
          <Text
            fontSize={scale(11)}
            fontFamily={fontFamily.regular}
            numberOfLines={1}
            color={Colors.BLACK_1}>
            {item?.project?.bids?.length > 0 && lowBid !== -1
              ? 'Current low bid'
              : 'Be the first bidder'}
          </Text>
          {item?.project?.bids?.length > 0 && lowBid !== -1 && (
            <Text
              fontSize={scale(11)}
              fontFamily={fontFamily.regular}
              color={Colors.INFO}
              numberOfLines={1}>
              $ {lowBid}
            </Text>
          )}
        </HStack>
      </TouchableOpacity>
    </Box>
  );
};

export default SearchProjectItem;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: verticalScale(126),
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    overflow: 'hidden',
  },
  flex1: {
    flex: 1,
  },
});
