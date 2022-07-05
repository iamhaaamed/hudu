import React, {useMemo, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {HStack, Text, VStack, Center} from 'native-base';
import {scale, fontFamily} from '~/utils/style';
import {Colors} from '~/styles';
import {
  SectionProjectLabel,
  CustomImage,
  SectionChooseHudur,
  SectionFinishProject,
  QuestionModal,
  SectionBidAmount,
} from '~/components';
import {navigate} from '~/navigation/Methods';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDeleteProject} from '~/hooks/project';
import {ResponseStatus} from '~/generated/graphql';

const SectionListerProjectRow = ({item}: {item: any}) => {
  const currentBid = useMemo(() => {
    let res = {
      amount: -1,
      id: undefined,
      bidStatus: undefined,
      description: undefined,
    };
    if (item?.project?.projectStatus === 'BIDDING') {
      if (item?.project?.bids?.length > 0) {
        let filteredBids = item?.project?.bids.filter(
          (element: any) =>
            element?.bidStatus === 'IN_PROGRESS' ||
            element?.bidStatus === 'WAITING',
        );
        if (filteredBids?.length > 0) {
          res = item?.project?.bids.reduce(function (prev: any, curr: any) {
            return prev?.amount < curr?.amount ? prev : curr;
          });
        }
      }
    } else {
      res = item?.project?.bids?.find(function (object: any) {
        if (
          object?.bidStatus === 'IN_PROGRESS' ||
          object?.bidStatus === 'FINISHED'
        ) {
          return object;
        }
      });
    }
    return res;
  }, [item]);

  const swipeable = useRef<Swipeable>(null);

  const {mutate: mutateDeleteProject, isLoading: deleteProjectLoading} =
    useDeleteProject();

  const [questionModalVisible, setQuestionModalVisible] =
    useState<boolean>(false);

  const deleteOnPress = () => {
    if (item?.project?.projectStatus === 'BIDDING') {
      setQuestionModalVisible(true);
    }
  };

  const onCloseQuestionModal = () => {
    setQuestionModalVisible(false);
  };

  const deleteHandler = () => {
    mutateDeleteProject(item?.project?.id, {
      onSuccess: successData => {
        if (
          successData?.project_deleteProject?.status === ResponseStatus.Success
        ) {
          setQuestionModalVisible(false);
        }
      },
    });
  };

  const itemOnPress = () => {
    navigate('ProjectDetailsHudur', {projectId: item?.project?.id});
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
        //renderRightActions={renderRightActions}
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
                  <SectionBidAmount
                    {...{
                      projectStatus: item?.project?.projectStatus,
                      currentBid,
                      bids: item?.project?.bids,
                    }}
                  />
                  {item?.project?.bids?.length > 0 &&
                    currentBid?.amount !== -1 && (
                      <Text
                        fontSize={scale(16)}
                        fontFamily={fontFamily.regular}
                        color={Colors.INFO}>
                        ${currentBid?.amount}
                      </Text>
                    )}
                </HStack>
                {item?.project?.projectStatus === 'BIDDING' && (
                  <SectionChooseHudur {...{projectId: item?.project?.id}} />
                )}
                {item?.project?.projectStatus === 'IN_PROGRESS' && (
                  <SectionFinishProject
                    {...{projectId: item?.project?.id, currentBid}}
                  />
                )}
              </VStack>
            </HStack>
          </TouchableOpacity>
        </Center>
      </Swipeable>
      <QuestionModal
        visible={questionModalVisible}
        onClose={onCloseQuestionModal}
        title="Are you sure you want delete this project?"
        option1="Cancel"
        option2="Delete"
        option1OnPress={onCloseQuestionModal}
        option2OnPress={deleteHandler}
        loading={deleteProjectLoading}
      />
    </>
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


import Feather from 'react-native-vector-icons/Feather';


  const editOnPress = () => {};

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
          <Feather name="edit"
          size={scale(24)}
            color={Colors.BLACK_3}
          />
        </Center>
      </TouchableOpacity>
    );
  };

*/
