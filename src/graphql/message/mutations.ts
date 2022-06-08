import {gql} from 'graphql-request';

export const MESSAGE_CREATE_MESSAGE = gql`
  mutation message_createMessage($messageInput: MessageInput) {
    message_createMessage(messageInput: $messageInput) {
      result {
        createdAt
        conversationId
        conversation {
          subject
          firstUserId
          secondUserId
          firstUnreadCount
          secondUnreadCount
          latestMessageDate
          id
          isDeleted
          createdDate
        }
        senderId
        sender {
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
        text
        id
        isDeleted
        createdDate
      }
      status
    }
  }
`;

export const MESSAGE_DELETE_MESSAGE = gql`
  mutation message_deleteMessage($messageId: Int!) {
    message_deleteMessage(messageId: $messageId) {
      result {
        createdAt
        conversationId
        conversation {
          subject
          firstUserId
          secondUserId
          firstUnreadCount
          secondUnreadCount
          latestMessageDate
          id
          isDeleted
          createdDate
        }
        senderId
        sender {
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
        text
        id
        isDeleted
        createdDate
      }
      status
    }
  }
`;

export const MESSAGE_REMOVE_CONVERSATION = gql`
  mutation message_removeConversation($conversationId: Int!) {
    message_removeConversation(conversationId: $conversationId) {
      status
    }
  }
`;
