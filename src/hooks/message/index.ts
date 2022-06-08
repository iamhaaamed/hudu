import {useInfiniteQuery, useMutation, useQueryClient} from 'react-query';
import {PAGE_SIZE} from '~/constants/pagination';
import graphQLClient from '~/graphql/graphQLClient';
import queryKeys from '~/constants/queryKeys';
import {
  MESSAGE_GET_CONVERSATION,
  MESSAGE_GET_USER_MESSAGES,
} from '~/graphql/message/queries';
import {
  Message_CreateMessageMutation,
  Message_CreateMessageMutationVariables,
  Message_DeleteMessageMutation,
  Message_DeleteMessageMutationVariables,
  Message_GetConversationQuery,
  Message_GetConversationQueryVariables,
  Message_GetUserMessagesQuery,
  Message_GetUserMessagesQueryVariables,
  Message_RemoveConversationMutation,
  Message_RemoveConversationMutationVariables,
  ResponseStatus,
} from '~/generated/graphql';
import {
  MESSAGE_CREATE_MESSAGE,
  MESSAGE_DELETE_MESSAGE,
  MESSAGE_REMOVE_CONVERSATION,
} from '~/graphql/message/mutations';
import {showMessage} from 'react-native-flash-message';

export const useGetConversation = (options: any = {}) => {
  return useInfiniteQuery<
    Message_GetConversationQuery,
    any,
    Message_GetConversationQueryVariables,
    any
  >(
    [queryKeys.conversation, options],
    async ({pageParam = 0}) => {
      return graphQLClient.request(MESSAGE_GET_CONVERSATION, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      });
    },
    {
      getNextPageParam: (
        lastPage: Message_GetConversationQuery,
        allPages: Message_GetConversationQuery[],
      ) => {
        if (lastPage?.message_getConversation?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.message_getConversation?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useGetUserMessages = (options: any = {}) => {
  return useInfiniteQuery<
    Message_GetUserMessagesQuery,
    any,
    Message_GetUserMessagesQueryVariables,
    any
  >(
    [queryKeys.userMessages, options],
    async ({pageParam = 0}) => {
      return graphQLClient.request(MESSAGE_GET_USER_MESSAGES, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      });
    },
    {
      getNextPageParam: (
        lastPage: Message_GetUserMessagesQuery,
        allPages: Message_GetUserMessagesQuery[],
      ) => {
        if (lastPage?.message_getUserMessages?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.message_getUserMessages?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Message_CreateMessageMutation,
    any,
    Message_CreateMessageMutationVariables
  >(
    async (messageInput: any) => {
      return graphQLClient.request(MESSAGE_CREATE_MESSAGE, {messageInput});
    },
    {
      onSuccess: (successData: any) => {
        if (
          successData?.message_createMessage?.status === ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.userMessages);
        }
      },
      onError: (errorData: any) => {
        console.log('message_createMessageError=>', errorData);
        showMessage({type: 'danger', message: JSON.stringify(errorData)});
      },
    },
  );
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Message_DeleteMessageMutation,
    any,
    Message_DeleteMessageMutationVariables
  >(
    async (messageId: any) => {
      return graphQLClient.request(MESSAGE_DELETE_MESSAGE, {messageId});
    },
    {
      onSuccess: (successData: any) => {
        if (
          successData?.message_deleteMessage?.status === ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.userMessages);
        }
      },
      onError: (errorData: any) => {
        console.log('message_deleteMessageError=>', errorData);
        showMessage({type: 'danger', message: JSON.stringify(errorData)});
      },
    },
  );
};

export const useRemoveConversation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Message_RemoveConversationMutation,
    any,
    Message_RemoveConversationMutationVariables
  >(
    async (conversationId: any) => {
      return graphQLClient.request(MESSAGE_REMOVE_CONVERSATION, {
        conversationId,
      });
    },
    {
      onSuccess: (successData: any) => {
        if (
          successData?.message_removeConversation?.status ===
          ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.conversation);
        }
      },
      onError: (errorData: any) => {
        console.log('message_removeConversationError=>', errorData);
        showMessage({type: 'danger', message: JSON.stringify(errorData)});
      },
    },
  );
};
