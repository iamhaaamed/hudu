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
          userId
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
