import {gql} from 'graphql-request';

export const PROJECT_GET_PROJECT = gql`
  query project_getProject($projectId: Int!) {
    project_getProject(projectId: $projectId) {
      result {
        project {
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
          projectDeadLine
          projectImages {
            imageAddress
            id
          }
          bids {
            bidStatus
            amount
            description
            hudu {
              userName
              imageAddress
              averageRate
              listersWhoRatedToMeCount
              huduersWhoRatedToMeCount
            }
            lister {
              userName
              imageAddress
              averageRate
              listersWhoRatedToMeCount
              huduersWhoRatedToMeCount
            }
          }
          questions {
            text
            parentQuestion {
              text
            }
            parentId
            childrenQuestions {
              text
            }
            user {
              userName
            }
          }
          user {
            id
            email
            userName
            imageAddress
            firstName
            lastName
            averageRate
            listersWhoRatedToMeCount
            huduersWhoRatedToMeCount
          }
        }
        isLiked
      }
      status
    }
  }
`;

export const PROJECT_GET_PROJECTS = gql`
  query project_getProjects(
    $skip: Int
    $take: Int
    $where: ProjectDtoFilterInput
    $order: [ProjectDtoSortInput!]
    $projectFilter: ProjectFilter
    $location: Position
  ) {
    project_getProjects(projectFilter: $projectFilter, location: $location) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          project {
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
            projectDeadLine
            projectImages {
              imageAddress
              id
            }
            bids {
              bidStatus
              amount
              description
            }
          }
          isLiked
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

export const PROJECT_GET_QUESTIONS = gql`
  query project_getQuestions(
    $skip: Int
    $take: Int
    $where: QuestionFilterInput
    $order: [QuestionSortInput!]
  ) {
    project_getQuestions {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          text
          parentId
          projectId
          userId
          id
          isDeleted
          createdDate
          text
          user {
            userName
            email
            imageAddress
            firstName
          }
          userId
          parentId
          childrenQuestions {
            userId
            text
            user {
              userName
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

export const PROJECT_GET_USER_LIKE_PROJECT = gql`
  query project_getUserLikeProject($projectId: Int!) {
    project_getUserLikeProject(projectId: $projectId) {
      result {
        project {
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
          projectDeadLine
          projectImages {
            imageAddress
            id
          }
          bids {
            bidStatus
            amount
            description
          }
        }
        isLiked
      }
      status
    }
  }
`;

export const PROJECT_GET_USER_LIKE_PROJECTS = gql`
  query project_getUserLikeProjects(
    $skip: Int
    $take: Int
    $where: ProjectDtoFilterInput
    $order: [ProjectDtoSortInput!]
    $projectFilter: ProjectFilter
    $location: Position
  ) {
    project_getUserLikeProjects(
      projectFilter: $projectFilter
      location: $location
    ) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          isLiked
          project {
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
            projectDeadLine
            createdDate
            projectImages {
              imageAddress
              id
            }
            bids {
              bidStatus
              amount
              description
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
