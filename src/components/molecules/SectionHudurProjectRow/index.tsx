import React, {useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {HStack, Text, VStack, Center} from 'native-base';
import {scale, fontFamily} from '~/utils/style';
import {Colors} from '~/styles';
import {
  SectionBidLabel,
  CustomImage,
  SectionLeaveReview,
  EditModal,
  QuestionModal,
} from '~/components';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDeleteBid, useEditBid} from '~/hooks/bid';
import {ResponseStatus} from '~/generated/graphql';
import {useQueryClient} from 'react-query';
import queryKeys from '~/constants/queryKeys';
import {navigate} from '~/navigation/Methods';
import {userDataStore} from '~/stores';

const SectionHudurProjectRow = ({item}: {item: any}) => {
  const {userData} = userDataStore(state => state);
  const swipeable = useRef<Swipeable>(null);
  const queryClient = useQueryClient();

  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [questionModalVisible, setQuestionModalVisible] =
    useState<boolean>(false);
  const {mutate: mutateEditBid, isLoading: editBidLoading} = useEditBid();
  const {mutate: mutateDeleteBid, isLoading: deleteBidLoading} = useDeleteBid();

  const itemOnPress = () => {
    if (item?.bidStatus === 'WAITING' || item?.bidStatus === 'FINISHED') {
      navigate('ProjectDetailsHudur', {projectId: item?.projectId});
    } else if (item?.bidStatus === 'IN_PROGRESS') {
      if (item?.huduId === userData?.id) {
        navigate('ProjectDetailsHudur', {projectId: item?.projectId});
      }
    }
  };

  const deleteOnPress = () => {
    if (item?.bidStatus === 'WAITING') {
      setQuestionModalVisible(true);
    }
  };

  const onCloseQuestionModal = () => {
    discardSwipe();
    setQuestionModalVisible(false);
  };

  const deleteHandler = () => {
    mutateDeleteBid(item?.id, {
      onSuccess: successData => {
        if (successData?.bid_deleteBid?.status === ResponseStatus.Success) {
          discardSwipe();
          setQuestionModalVisible(false);
        }
      },
    });
  };

  const editOnPress = () => {
    if (item?.bidStatus === 'WAITING') {
      setEditModalVisible(true);
    }
  };

  const closeEditModal = () => {
    discardSwipe();
    setEditModalVisible(false);
  };

  const submitEditModal = (formData: any) => {
    const input = {
      id: item?.id,
      amount: formData?.amount,
      description: formData?.description,
      bidStatus: item?.bidStatus,
    };
    mutateEditBid(input, {
      onSuccess: successData => {
        if (successData?.bid_editBid?.status === ResponseStatus.Success) {
          queryClient.invalidateQueries(queryKeys.projects);
          queryClient.invalidateQueries(queryKeys.bids);
          discardSwipe();
          setEditModalVisible(false);
        }
      },
    });
  };

  const discardSwipe = () => {
    swipeable.current?.close();
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
          <Feather name="edit" size={scale(24)} color={Colors.BLACK_3} />
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
          <Ionicons
            name="trash-outline"
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
        renderRightActions={item?.bidStatus === 'WAITING' && renderRightActions}
        renderLeftActions={renderLeftActions}>
        <Center
          px="2"
          py="2"
          mx="1"
          my="1"
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
                resizeMode="cover"
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
                  <SectionBidLabel {...{item}} />
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
                    Your bid
                  </Text>
                  <Text
                    fontSize={scale(16)}
                    fontFamily={fontFamily.regular}
                    color={Colors.INFO}>
                    ${item?.amount}
                  </Text>
                </HStack>
                {item?.bidStatus === 'FINISHED' && (
                  <SectionLeaveReview {...{bidId: item?.id}} />
                )}
              </VStack>
            </HStack>
          </TouchableOpacity>
        </Center>
      </Swipeable>
      <EditModal
        visible={editModalVisible}
        onClose={closeEditModal}
        onSubmit={submitEditModal}
        title="Bid details"
        buttonTitle="Save"
        loading={editBidLoading}
        defaultData={{
          amount: item?.amount,
          description: item?.description,
        }}
      />
      <QuestionModal
        visible={questionModalVisible}
        onClose={onCloseQuestionModal}
        title="Are you sure you want delete this bid?"
        option1="Cancel"
        option2="Delete"
        option1OnPress={onCloseQuestionModal}
        option2OnPress={deleteHandler}
        loading={deleteBidLoading}
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
  item: {
    width: '100%',
    flex: 1,
  },
});
