import {gql} from 'graphql-request';

export const USER_GET_PROFILE = gql`
  query user_getProfile($userId: Int) {
    user_getProfile(userId: $userId) {
      result {
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
        longitude
        latitude
        zipCode
        rate
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
      status
    }
  }
`;
