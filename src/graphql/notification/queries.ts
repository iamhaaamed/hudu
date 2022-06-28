import {gql} from 'graphql-request';

export const NOTIFICATION_GET_NOTIFICATIONS = gql`
  query notification_getNotifications(
    $skip: Int
    $take: Int
    $where: NotificationFilterInput
    $order: [NotificationSortInput!]
  ) {
    notification_getNotifications {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          title
          description
          isReaded
          notificationType
          projectId
          bidId
          userId
          id
          isDeleted
          createdDate
          project {
            projectDeadLine
            projectStatus
            title
            description
            id
          }
          bid {
            amount
            hudu {
              id
              userName
            }
            lister {
              userName
              id
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
