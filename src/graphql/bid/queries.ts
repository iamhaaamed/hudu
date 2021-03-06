import {gql} from 'graphql-request';

export const BID_GET_BIDS = gql`
  query bid_getBids(
    $skip: Int
    $take: Int
    $where: BidFilterInput
    $order: [BidSortInput!]
    $projectFilter: ProjectFilter
    $location: Position
  ) {
    bid_getBids(projectFilter: $projectFilter, location: $location) {
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
          lister {
            userName
            firstName
            lastName
            id
          }
          hudu {
            userName
            imageAddress
            averageRate
            listersWhoRatedToMeCount
            huduersWhoRatedToMeCount
            id
          }
          project {
            projectDeadLine
            projectStatus
            title
            description
            bids {
              amount
              id
              huduId
            }
            projectImages {
              imageAddress
            }
          }
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
