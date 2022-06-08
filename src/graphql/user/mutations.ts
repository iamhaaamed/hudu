import {gql} from 'graphql-request';

export const USER_LOGIN = gql`
  query user_login {
    user_login {
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

export const USER_SIGN_UP = gql`
  mutation user_signUp {
    user_signUp {
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

export const USER_UPDATE_LAST_SEEN = gql`
  mutation user_UpdateLastSeen {
    user_UpdateLastSeen {
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

export const USER_UPDATE_PROFILE = gql`
  mutation user_updateProfile($userInput: UserInput) {
    user_updateProfile(userInput: $userInput) {
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
