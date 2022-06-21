import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {VStack, Box} from 'native-base';
import {
  ModalContainer,
  ModalHeader,
  BidItem,
  CustomLoading,
  EmptyData,
} from '~/components';
import {scale} from '~/utils/style';
import {Colors} from '~/styles';
import {useGetBids} from '~/hooks/bid';

const ChooseHudurModal = ({
  visible,
  onClose,
  title,
  projectId,
}: {
  visible: boolean;
  onClose: any;
  title: string;
  projectId?: any;
}) => {
  const listerReviewOption = {
    where: {bidStatus: {eq: 'WAITING'}, projectId: {eq: projectId}},
  };

  const {
    isLoading: getBidsLoading,
    data: getBids,
    fetchNextPage: fetchNextPageGetBids,
    hasNextPage: hasNextPageGetBids,
  } = useGetBids(listerReviewOption);

  const bids = getBids?.pages ?? [];

  const onCloseHandler = () => {
    onClose?.();
  };

  const onLoadMore = () => {
    if (hasNextPageGetBids) {
      fetchNextPageGetBids();
    }
  };

  const loading = getBidsLoading;

  const renderItem = ({item}: {item: any}) => <BidItem {...{item}} />;

  return (
    <ModalContainer
      isVisible={visible}
      onClose={onCloseHandler}
      style={styles.modal}>
      <VStack bg={Colors.WHITE} py="4" space="4" borderRadius="md">
        <Box px="2">
          <ModalHeader text={title} onPress={onCloseHandler} />
        </Box>
        {loading && <CustomLoading />}
        <VStack bg={Colors.WHITE} w="100%">
          <FlatList
            showsVerticalScrollIndicator={false}
            data={bids}
            renderItem={renderItem}
            ListEmptyComponent={EmptyData}
            keyExtractor={(_, index) => `key${index}`}
            onEndReachedThreshold={0.9}
            onEndReached={({distanceFromEnd}) => {
              if (distanceFromEnd < 0) return;
              onLoadMore();
            }}
          />
        </VStack>
      </VStack>
    </ModalContainer>
  );
};

export default ChooseHudurModal;

const styles = StyleSheet.create({
  modal: {
    borderRadius: 8,
    margin: scale(16),
    overflow: 'hidden',
  },
  avatar: {
    height: scale(36),
    width: scale(36),
    borderRadius: 100,
  },
});
