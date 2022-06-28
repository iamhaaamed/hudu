import {gql} from 'graphql-request';

export const BID_ACCEPT_BID = gql`
  mutation bid_acceptBid($bidId: Int!) {
    bid_acceptBid(bidId: $bidId) {
      result {
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
      status
    }
  }
`;

export const BID_ADD_BID = gql`
  mutation bid_addBid($bidInput: BidInput) {
    bid_addBid(bidInput: $bidInput) {
      result {
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
      status
    }
  }
`;

export const BID_CANCELL_BID = gql`
  mutation bid_cancellBid($bidId: Int!) {
    bid_cancellBid(bidId: $bidId) {
      result {
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
      status
    }
  }
`;

export const BID_DELETE_BID = gql`
  mutation bid_deleteBid($bidId: Int!) {
    bid_deleteBid(bidId: $bidId) {
      result {
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
      status
    }
  }
`;

export const BID_EDIT_BID = gql`
  mutation bid_editBid($editBidInput: EditBidInput) {
    bid_editBid(editBidInput: $editBidInput) {
      result {
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
      status
    }
  }
`;

export const BID_REJECT_BID = gql`
  mutation bid_rejectBid($bidId: Int!) {
    bid_rejectBid(bidId: $bidId) {
      result {
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
      status
    }
  }
`;
