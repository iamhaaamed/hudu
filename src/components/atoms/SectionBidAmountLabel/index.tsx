import React from 'react';
import {Text} from 'native-base';
import {scale, fontFamily} from '~/utils/style';
import {Colors} from '~/styles';
import {userDataStore} from '~/stores';

const SectionBidAmountLabel = ({
  projectStatus,
  currentBid,
  listerId,
  bids,
}: {
  projectStatus: string;
  currentBid: any;
  listerId: number;
  bids: any;
}) => {
  const {userData} = userDataStore(state => state);
  const isFinished = projectStatus === 'FINISHED';
  const isInProgress = projectStatus === 'IN_PROGRESS';
  const isLister = listerId === userData?.id;

  return (
    <Text
      fontSize={scale(14)}
      fontFamily={fontFamily.regular}
      color={Colors.BLACK_1}>
      {bids?.length > 0 && currentBid?.amount !== -1
        ? isFinished || isInProgress
          ? 'Bid amount'
          : 'Current low bid'
        : isLister
        ? 'No bid yet'
        : 'Be the first one to bid'}
    </Text>
  );
};

export default SectionBidAmountLabel;
