import {gql} from 'graphql-request';

export const NOTIFICATION_ADD_NOTIFICATION = gql`
  mutation notification_addNotification(
    $skip: Int
    $take: Int
    $where: NotificationFilterInput
    $order: [NotificationSortInput!]
    $notifications: [NotificationInputsInput]
  ) {
    notification_addNotification(notifications: $notifications) {
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

export const NOTIFICATION_READ_NOTIFICATION = gql`
  mutation notification_readNotification($notificationId: Int!) {
    notification_readNotification(notificationId: $notificationId) {
      result {
        title
        description
        isReaded
        notificationType
        userId
        user {
          email
          userName
          lastSeen
          userTypes
          imageAddress
          firstName
          lastName
          bio
          streetAddress
          city
          state
          isActive
          longitude
          latitude
          zipCode
          asHuduRates
          listersWhoRatedToMeCount
          asListerRates
          huduersWhoRatedToMeCount
          averageRate
          externalId
          id
          isDeleted
          createdDate
        }
        id
        isDeleted
        createdDate
      }
      status
    }
  }
`;

export const NOTIFICATION_DELETE_NOTIFICATION = gql`
  mutation notification_deleteNotification($notificationId: Int!) {
    notification_deleteNotification(notificationId: $notificationId) {
      result {
        title
        description
        isReaded
        notificationType
        entityId
        userId
        user {
          email
          userName
          lastSeen
          userTypes
          imageAddress
          firstName
          lastName
          bio
          streetAddress
          city
          state
          isActive
          longitude
          latitude
          zipCode
          asHuduRates
          listersWhoRatedToMeCount
          asListerRates
          huduersWhoRatedToMeCount
          averageRate
          externalId
          id
          isDeleted
          createdDate
        }
        id
        isDeleted
        createdDate
      }
      status
    }
  }
`;
