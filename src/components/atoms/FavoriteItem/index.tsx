import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Box, VStack, HStack} from 'native-base';
import {Colors} from '~/styles';
import {
  CustomImage,
  FavoriteIcon,
  TimeLeftLabel,
  SectionBidAmount,
} from '~/components';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {navigate} from '~/navigation/Methods';

const FavoriteItem = ({item}: {item?: any}) => {
  const onPressHandler = () => {
    navigate('ProjectDetailsHudur', {projectId: item?.project?.id});
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
            <FavoriteIcon
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
          <Text
            fontSize={scale(14)}
            fontFamily={fontFamily.bold}
            numberOfLines={1}>
            {item?.project?.title}
          </Text>
          <Text
            fontSize={scale(11)}
            fontFamily={fontFamily.regular}
            numberOfLines={3}
            color={Colors.PLACEHOLDER}>
            {item?.project?.description}
          </Text>
        </VStack>
        <SectionBidAmount
          {...{
            projectStatus: item?.project?.projectStatus,
            bids: item?.project?.bids,
            listerId: item?.project?.userId,
          }}
        />
      </TouchableOpacity>
    </Box>
  );
};

export default FavoriteItem;

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
