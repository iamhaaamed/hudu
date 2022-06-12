import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Box, VStack, HStack} from 'native-base';
import {Colors} from '~/styles';
import {CustomImage, ProjectFavoriteIcon} from '~/components';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {navigate} from '~/navigation/Methods';

const ProjectItem = ({item}: {item?: any}) => {
  const onPressHandler = () => {
    navigate('ProjectDetailsHudur');
  };

  return (
    <Box
      mb="4"
      w="48%"
      h={verticalScale(268)}
      shadow="4"
      borderRadius="md"
      bg={Colors.WHITE}>
      <TouchableOpacity
        style={styles.flex1}
        activeOpacity={0.7}
        onPress={onPressHandler}>
        <CustomImage
          local
          imageSource={item?.image}
          style={styles.image}
          resizeMode="stretch">
          <VStack flex={1} justifyContent="space-between">
            <HStack w="100%" px="2" py="2">
              <ProjectFavoriteIcon />
            </HStack>
            <HStack alignItems="center" w="100%" px="2" h={verticalScale(24)}>
              <Box
                w="100%"
                h="100%"
                position="absolute"
                bg={Colors.BLACK_1}
                opacity={0.75}
              />
              <Text
                zIndex={10}
                color={Colors.WHITE}
                fontSize={scale(11)}
                fontFamily={fontFamily.medium}>
                Time left: {item?.timeLeft}
              </Text>
            </HStack>
          </VStack>
        </CustomImage>
        <VStack py="2" px="2" space="2" flex={1}>
          <Text
            fontSize={scale(18)}
            fontFamily={fontFamily.bold}
            numberOfLines={1}>
            {item?.title}
          </Text>
          <Text
            fontSize={scale(11)}
            fontFamily={fontFamily.regular}
            numberOfLines={3}
            color={Colors.PLACEHOLDER}>
            {item?.description}
          </Text>
        </VStack>
        <HStack pb="2" px="2" justifyContent="space-between">
          <Text
            fontSize={scale(11)}
            fontFamily={fontFamily.regular}
            numberOfLines={1}
            color={Colors.BLACK_1}>
            {item?.lowBid ? 'Current low bid' : 'Be the first bidder'}
          </Text>
          {item?.lowBid && (
            <Text
              fontSize={scale(11)}
              fontFamily={fontFamily.regular}
              color={Colors.INFO}
              numberOfLines={1}>
              $ {item?.lowBid}
            </Text>
          )}
        </HStack>
      </TouchableOpacity>
    </Box>
  );
};

export default ProjectItem;

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
