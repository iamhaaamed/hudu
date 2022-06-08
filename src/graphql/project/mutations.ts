import {gql} from 'graphql-request';

export const PROJECT_ADD_FEED_BACK = gql`
  mutation project_addFeedBack($feedbackInput: FeedbackInput) {
    project_addFeedBack(feedbackInput: $feedbackInput) {
      result {
        bidStatus
        amount
        description
        hudusComment
        hudusRate
        isHuduCommented
        listersComment
        listersRate
        isListerCommented
        hudu {
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
          externalId
          id
          isDeleted
          createdDate
        }
        huduId
        lister {
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
          externalId
          id
          isDeleted
          createdDate
        }
        listerId
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
        }
        projectId
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
        id
        isDeleted
        createdDate
      }
      status
    }
  }
`;

export const PROJECT_ADD_PROJECT = gql`
  mutation project_addProject($addProjectInput: AddProjectInput) {
    project_addProject(addProjectInput: $addProjectInput) {
      result {
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
        bids {
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
        questions {
          text
          parentId
          projectId
          userId
          id
          isDeleted
          createdDate
        }
        projectImages {
          imageAddress
          projectId
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
          longitude
          latitude
          zipCode
          rate
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

export const PROJECT_ADD_QUESTION = gql`
  mutation project_addQuestion($questionInput: QuestionInput) {
    project_addQuestion(questionInput: $questionInput) {
      result {
        text
        parentQuestion {
          text
          parentId
          projectId
          userId
          id
          isDeleted
          createdDate
        }
        parentId
        childrenQuestions {
          text
          parentId
          projectId
          userId
          id
          isDeleted
          createdDate
        }
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
        }
        projectId
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
          longitude
          latitude
          zipCode
          rate
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

export const PROJECT_EDIT_PROJECT = gql`
  mutation project_editProject($editProjectInput: EditProjectInput) {
    project_editProject(editProjectInput: $editProjectInput) {
      result {
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
        bids {
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
        questions {
          text
          parentId
          projectId
          userId
          id
          isDeleted
          createdDate
        }
        projectImages {
          imageAddress
          projectId
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
          longitude
          latitude
          zipCode
          rate
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

export const PROJECT_FAILE_PROJECT = gql`
  mutation project_faileProject($projectId: Int!) {
    project_faileProject(projectId: $projectId) {
      result {
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
        bids {
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
        questions {
          text
          parentId
          projectId
          userId
          id
          isDeleted
          createdDate
        }
        projectImages {
          imageAddress
          projectId
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
          longitude
          latitude
          zipCode
          rate
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

export const PROJECT_FINISHE_PROJECT = gql`
  mutation project_finisheProject($projectId: Int!) {
    project_finisheProject(projectId: $projectId) {
      result {
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
        bids {
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
        questions {
          text
          parentId
          projectId
          userId
          id
          isDeleted
          createdDate
        }
        projectImages {
          imageAddress
          projectId
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
          longitude
          latitude
          zipCode
          rate
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

export const PROJECT_LIKE = gql`
  mutation project_like($projectId: Int!) {
    project_like(projectId: $projectId) {
      result {
        projectId
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
        }
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
          longitude
          latitude
          zipCode
          rate
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

export const PROJECT_REOPEN_PROJECT = gql`
  mutation project_reopenProject($projectId: Int!) {
    project_reopenProject(projectId: $projectId) {
      result {
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
        bids {
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
        questions {
          text
          parentId
          projectId
          userId
          id
          isDeleted
          createdDate
        }
        projectImages {
          imageAddress
          projectId
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
          longitude
          latitude
          zipCode
          rate
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

export const PROJECT_UNLIKE = gql`
  mutation project_unlike($projectId: Int!, $userId: Int) {
    project_unlike(projectId: $projectId, userId: $userId) {
      result {
        projectId
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
        }
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
          longitude
          latitude
          zipCode
          rate
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
