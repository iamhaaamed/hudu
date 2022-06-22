import {gql} from 'graphql-request';

export const NOTIFICATION_ADDED = gql`
  subscription notificationAdded($userId: Int!) {
    notificationAdded(userId: $userId) {
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
        payments {
          amount
          intentId
          intentStatus
          clientSecret
          bidId
          userId
          id
          isDeleted
          createdDate
        }
        userLikeProjects {
          projectId
          userId
          id
          isDeleted
          createdDate
        }
        projects {
          projectStatus
          title
          description
          duration
          availability
          streetAddress
          city
          state
          projectDeadLine
          longitude
          latitude
          zipCode
          userId
          id
          isDeleted
          createdDate
        }
        notifications {
          title
          description
          isReaded
          notificationType
          userId
          id
          isDeleted
          createdDate
        }
        questions {
          text
          parentId
          projectId
          userId
          id
          isDeleted
          createdDate
        }
        hudus {
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
        listers {
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
        externalId
        id
        isDeleted
        createdDate
      }
      id
      isDeleted
      createdDate
    }
  }
`;
