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
