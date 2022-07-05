import React from 'react';
import {Text} from 'native-base';
import {scale, fontFamily} from '~/utils/style';
import {Colors} from '~/styles';

const SectionBidAmount = ({
  projectStatus,
  currentBid,
  bids,
}: {
  projectStatus: string;
  currentBid: any;
  bids: any;
}) => {
  const isFinished = projectStatus === 'FINISHED';
  const isInProgress = projectStatus === 'IN_PROGRESS';

  return (
    <Text
      fontSize={scale(14)}
      fontFamily={fontFamily.regular}
      color={Colors.BLACK_1}>
      {bids?.length > 0 && currentBid?.amount !== -1
        ? isFinished || isInProgress
          ? 'Bid amount'
          : 'Current low bid'
        : 'Be the first one to bid'}
    </Text>
  );
};

export default SectionBidAmount;
