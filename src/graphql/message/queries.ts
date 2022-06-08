import {gql} from 'graphql-request';

export const MESSAGE_GET_CONVERSATION = gql`
  query message_getConversation(
    $skip: Int
    $take: Int
    $where: MessagesFilterInput
    $order: [MessagesSortInput!]
    $conversationId: Int!
  ) {
    message_getConversation(conversationId: $conversationId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          createdAt
          conversationId
          senderId
          text
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

export const MESSAGE_GET_USER_MESSAGES = gql`
  query message_getUserMessages(
    $skip: Int
    $take: Int
    $where: ConversationDtoFilterInput
    $order: [ConversationDtoSortInput!]
  ) {
    message_getUserMessages {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          subject
          conversationId
          unreadCount
          latestMessageDate
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
