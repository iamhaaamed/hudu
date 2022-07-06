import React, {useMemo} from 'react';
import {Text, HStack} from 'native-base';
import {Colors} from '~/styles';
import {fontFamily, scale} from '~/utils/style';
import {userDataStore} from '~/stores';

const SectionBidAmount = ({
  projectStatus,
  bids,
  listerId,
}: {
  projectStatus: string;
  bids: any;
  listerId: number;
}) => {
  const {userData} = userDataStore(state => state);

  const isLister = listerId === userData?.id;

  const currentBid = useMemo(() => {
    let res = {
      amount: -1,
      id: undefined,
      bidStatus: undefined,
      description: undefined,
    };
    if (projectStatus === 'BIDDING') {
      if (bids?.length > 0) {
        let filteredBids = bids.filter(
          (element: any) =>
            element?.bidStatus === 'IN_PROGRESS' ||
            element?.bidStatus === 'WAITING',
        );
        if (filteredBids?.length > 0) {
          res = filteredBids.reduce(function (prev: any, curr: any) {
            return prev?.amount < curr?.amount ? prev : curr;
          });
        }
      }
    } else {
      res = bids?.find(function (object: any) {
        if (
          object?.bidStatus === 'IN_PROGRESS' ||
          object?.bidStatus === 'FINISHED'
        ) {
          return object;
        }
      });
    }
    return res;
  }, [bids, projectStatus]);

  return (
    <HStack pb="2" px="2" justifyContent="space-between">
      <Text
        fontSize={scale(11)}
        fontFamily={fontFamily.regular}
        numberOfLines={1}
        color={Colors.BLACK_1}>
        {bids?.length > 0 && currentBid?.amount !== -1
          ? 'Current low bid'
          : isLister
          ? 'No bid yet'
          : 'Be the first one to bid'}
      </Text>
      {bids?.length > 0 && currentBid?.amount !== -1 && (
        <Text
          fontSize={scale(11)}
          fontFamily={fontFamily.regular}
          color={Colors.INFO}
          numberOfLines={1}>
          $ {currentBid?.amount}
        </Text>
      )}
    </HStack>
  );
};

export default SectionBidAmount;
