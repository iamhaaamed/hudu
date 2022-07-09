import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Box, VStack, HStack} from 'native-base';
import {Colors} from '~/styles';
import {
  CustomImage,
  ProjectFavoriteIcon,
  TimeLeftLabel,
  SectionBidAmount,
} from '~/components';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {navigate} from '~/navigation/Methods';
import {userDataStore} from '~/stores';

const SearchProjectItem = ({
  item,
  userQuery,
}: {
  item?: any;
  userQuery?: any;
}) => {
  const {userData} = userDataStore(state => state);

  const isLister = userData?.id === item?.project?.userId;

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
        resizeMode="cover">
        <VStack flex={1} justifyContent="space-between">
          <HStack w="100%" px="2" py="2">
            {!isLister && (
              <ProjectFavoriteIcon
                {...{isLiked: item?.isLiked, projectId: item?.project?.id}}
              />
            )}
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
