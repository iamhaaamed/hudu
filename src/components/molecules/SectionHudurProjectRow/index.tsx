import React, {useRef, useState, useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {HStack, Text, VStack, Center, Icon} from 'native-base';
import {scale, fontFamily} from '~/utils/style';
import {Colors} from '~/styles';
import {
  SectionProjectLabel,
  CustomImage,
  SectionLeaveReview,
  EditModal,
} from '~/components';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {userDataStore} from '~/stores';

const SectionHudurProjectRow = ({item}: {item: any}) => {
  const swipeable = useRef<Swipeable>(null);

  const {userData} = userDataStore(state => state);

  const yourBid = useMemo(() => {
    const res = item?.project?.bids.find(
      (element: any) => element?.huduId === userData?.id,
    );
    return res?.amount ?? -1;
  }, [item]);

  const [editModalVisible, setEditModalVisible] = useState(false);

  const deleteOnPress = () => {};

  const editOnPress = () => {
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  const submitEditModal = (formData: any) => {
    setEditModalVisible(false);
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
    <>
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
          shadow="4">
          <CustomImage
            imageSource={item?.project?.imageAddress}
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
                Your bid
              </Text>
              {item?.project?.bids?.length > 0 && yourBid !== -1 && (
                <Text
                  fontSize={scale(16)}
                  fontFamily={fontFamily.regular}
                  color={Colors.INFO}>
                  ${yourBid}
                </Text>
              )}
            </HStack>
            {item?.project?.projectStatus === 'FINISHED' && (
              <SectionLeaveReview {...{bidId: item?.id}} />
            )}
          </VStack>
        </HStack>
      </Swipeable>
      <EditModal
        visible={editModalVisible}
        onClose={closeEditModal}
        onSubmit={submitEditModal}
        title="Bid details"
      />
    </>
  );
};

export default SectionHudurProjectRow;

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: scale(107),
    borderRadius: 10,
  },
});
