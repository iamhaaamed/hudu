import {gql} from 'graphql-request';

export const BID_GET_BIDS = gql`
  query bid_getBids(
    $skip: Int
    $take: Int
    $where: BidFilterInput
    $order: [BidSortInput!]
  ) {
    bid_getBids {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          bidStatus
          amount
          description
          hudusComment
          hudusRate
          isHuduCommented
          listersComment
          listersRate
          isListerCommented
          huduId
          listerId
          projectId
          id
          isDeleted
          createdDate
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        totalCount
      }
      status
    }
  }
`;
