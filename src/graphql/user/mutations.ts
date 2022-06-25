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
      status
    }
  }
`;

export const USER_SEND_EMAIL = gql`
  mutation user_sendEmail($email: EmailInput) {
    user_sendEmail(email: $email) {
      status
    }
  }
`;
