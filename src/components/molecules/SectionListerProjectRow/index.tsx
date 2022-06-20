import React, {useRef, useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {HStack, Text, VStack, Center, Icon} from 'native-base';
import {scale, fontFamily} from '~/utils/style';
import {Colors} from '~/styles';
import {
  SectionProjectLabel,
  CustomImage,
  SectionChooseHudur,
  SectionFinishProject,
} from '~/components';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {navigate} from '~/navigation/Methods';

const SectionListerProjectRow = ({item}: {item: any}) => {
  const swipeable = useRef<Swipeable>(null);

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

  const deleteOnPress = () => {};

  const editOnPress = () => {};

  const itemOnPress = () => {
    navigate('ProjectDetailsLister');
  };

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
      <Center
        px="2"
        py="2"
        mx="4"
        my="3"
        flex={1}
        borderRadius="lg"
        bg={Colors.WHITE}
        shadow="4">
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.7}
          onPress={itemOnPress}>
          <HStack space="2">
            <CustomImage
              imageSource={item?.project?.projectImages?.[0]?.imageAddress}
              style={styles.image}
            />
            <VStack flex={1} space="1">
              <HStack alignItems="center">
                <Text
                  flex={1}
                  numberOfLines={1}
                  fontSize={scale(16)}
                  fontFamily={fontFamily.medium}
                  color={Colors.BLACK_1}>
                  {item?.project?.title}
                </Text>
                <SectionProjectLabel {...{item}} />
              </HStack>
              <Text
                flex={1}
                numberOfLines={3}
                fontSize={scale(14)}
                fontFamily={fontFamily.regular}
                color={Colors.PLACEHOLDER}>
                {item?.project?.description}
              </Text>
              <HStack alignItems="center" justifyContent="space-between">
                <Text
                  fontSize={scale(14)}
                  fontFamily={fontFamily.regular}
                  color={Colors.BLACK_1}>
                  {item?.project?.bids?.length > 0 && lowBid !== -1
                    ? 'Current low bid'
                    : 'Be the first bidder'}
                </Text>
                {item?.project?.bids?.length > 0 && lowBid !== -1 && (
                  <Text
                    fontSize={scale(16)}
                    fontFamily={fontFamily.regular}
                    color={Colors.INFO}>
                    ${lowBid}
                  </Text>
                )}
              </HStack>
              {item?.project?.projectStatus === 'BIDDING' && (
                <SectionChooseHudur {...{projectId: item?.project?.id}} />
              )}
              {item?.project?.projectStatus === 'IN_PROGRESS' && (
                <SectionFinishProject
                  {...{projectId: item?.project?.id, bidId: item?.id}}
                />
              )}
            </VStack>
          </HStack>
        </TouchableOpacity>
      </Center>
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
  item: {
    width: '100%',
    flex: 1,
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
