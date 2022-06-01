import React, {useRef, useState} from 'react';
import {StyleSheet, Animated, TouchableOpacity} from 'react-native';
import {HStack, Text, VStack, Center, Box, Flex, Icon} from 'native-base';
import {scale, fontFamily, verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {SectionProjectLabel, CustomImage, CustomButton} from '~/components';
import images from '~/assets/images';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SectionListerProjectRow = ({item}: {item: any}) => {
  const swipeable = useRef<Swipeable>(null);

  const deleteOnPress = () => {};

  const editOnPress = () => {};

  const reviewOnPress = () => {};

  const renderRightActions = () => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={editOnPress}>
        <Center
          flex={1}
          bg={Colors.RIGHT_ACTION_BACKGROUND}
          my="1"
          mr="1"
          w={scale(59)}
          borderRightRadius="lg">
          <Icon
            as={<Feather name="edit" />}
            size={scale(24)}
            color={Colors.BLACK_3}
          />
        </Center>
      </TouchableOpacity>
    );
  };

  const renderLeftActions = () => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={deleteOnPress}>
        <Center
          flex={1}
          bg={Colors.LEFT_ACTION_BACKGROUND}
          my="1"
          ml="1"
          w={scale(59)}
          borderLeftRadius="lg">
          <Icon
            as={<Ionicons name="trash-outline" />}
            size={scale(24)}
            color={Colors.DELETE}
          />
        </Center>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      ref={swipeable}
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}>
      <HStack
        px="2"
        py="2"
        space="2"
        mx="1"
        my="1"
        flex={1}
        borderRadius="lg"
        bg={Colors.WHITE}
        shadow="2">
        <CustomImage
          local
          imageSource={item?.image}
          style={styles.image}
          resizeMode="stretch"
        />
        <VStack flex={1} space="1">
          <HStack alignItems="center">
            <Text
              flex={1}
              numberOfLines={1}
              fontSize={scale(16)}
              fontFamily={fontFamily.medium}
              color={Colors.BLACK_1}>
              {item?.title}
            </Text>
            <SectionProjectLabel {...{item}} />
          </HStack>
          <Text
            flex={1}
            numberOfLines={3}
            fontSize={scale(14)}
            fontFamily={fontFamily.regular}
            color={Colors.PLACEHOLDER}>
            {item?.description}
          </Text>
          <HStack alignItems="center" justifyContent="space-between">
            <Text
              fontSize={scale(14)}
              fontFamily={fontFamily.regular}
              color={Colors.BLACK_1}>
              Current low bid
            </Text>
            <Text
              fontSize={scale(16)}
              fontFamily={fontFamily.regular}
              color={Colors.INFO}>
              ${item?.lowBid}
            </Text>
          </HStack>
          {item?.id === 1 && (
            <CustomButton
              outline
              title="Choose a HUDUr"
              onPress={reviewOnPress}
              color={Colors.BLACK_3}
              height={verticalScale(35)}
            />
          )}
        </VStack>
      </HStack>
    </Swipeable>
  );
};

export default SectionListerProjectRow;

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: scale(107),
    borderRadius: 10,
  },
});

/*

  const [enableRightAction, setEnableRightAction] = useState(false);
  const [enableLeftAction, setEnableLeftAction] = useState(false);

  const onSwipeableOpen = (swipeValue: string) => {
    if (swipeValue === 'right') {
      setEnableRightAction(true);
    } else if (swipeValue === 'left') {
      setEnableLeftAction(true);
    }
  };

  const onSwipeableClose = (swipeValue: string) => {
    console.log(swipeValue);
    if (swipeValue === 'left') {
      setEnableRightAction(false);
    } else if (swipeValue === 'right') {
      setEnableLeftAction(false);
    }
  };

  onSwipeableOpen={onSwipeableOpen}
  onSwipeableClose={onSwipeableClose}

  borderRightRadius={enableRightAction ? '0' : 'lg'}
        borderLeftRadius={enableLeftAction ? '0' : 'lg'}

*/
