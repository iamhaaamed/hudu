import {useEffect} from 'react';
import {useInfiniteQuery, useMutation, useQueryClient} from 'react-query';
import {PAGE_SIZE} from '~/constants/pagination';
import graphQLClient from '~/graphql/graphQLClient';
import queryKeys from '~/constants/queryKeys';
import {NOTIFICATION_GET_NOTIFICATIONS} from '~/graphql/notification/queries';
import {NOTIFICATION_ADDED} from '~/graphql/notification/subscriptions';
import {
  NOTIFICATION_ADD_NOTIFICATION,
  NOTIFICATION_READ_NOTIFICATION,
} from '~/graphql/notification/mutations';
import {
  Notification_AddNotificationMutation,
  Notification_AddNotificationMutationVariables,
  Notification_GetNotificationsQuery,
  Notification_GetNotificationsQueryVariables,
  Notification_ReadNotificationMutation,
  Notification_ReadNotificationMutationVariables,
  ResponseStatus,
} from '~/generated/graphql';
import {showMessage} from 'react-native-flash-message';
import {Config} from 'react-native-config';

export const useGetNotifications = (options: any = {}) => {
  return useInfiniteQuery<
    Notification_GetNotificationsQuery,
    any,
    Notification_GetNotificationsQueryVariables,
    any
  >(
    [queryKeys.notifications, options],
    async ({pageParam = 0}) => {
      return graphQLClient.request(NOTIFICATION_GET_NOTIFICATIONS, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      });
    },
    {
      getNextPageParam: (
        lastPage: Notification_GetNotificationsQuery,
        allPages: Notification_GetNotificationsQuery[],
      ) => {
        if (
          lastPage?.notification_getNotifications?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.notification_getNotifications?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useAddNotification = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Notification_AddNotificationMutation,
    any,
    Notification_AddNotificationMutationVariables
  >(
    async (notifications: any) => {
      return graphQLClient.request(NOTIFICATION_ADD_NOTIFICATION, {
        notifications,
      });
    },
    {
      onSuccess: successData => {
        if (
          successData?.notification_addNotification?.status ===
          ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.notifications);
        }
      },
      onError: (errorData: any) => {
        console.log('notification_addNotificationError=>', errorData);
        showMessage({
          type: 'danger',
          message: JSON.stringify(errorData),
          icon: 'danger',
        });
      },
    },
  );
};

export const useReadNotification = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Notification_ReadNotificationMutation,
    any,
    Notification_ReadNotificationMutationVariables
  >(
    async (notificationId: any) => {
      return graphQLClient.request(NOTIFICATION_READ_NOTIFICATION, {
        notificationId,
      });
    },
    {
      onSuccess: successData => {
        if (
          successData?.notification_readNotification?.status ===
          ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.notifications);
        }
      },
      onError: (errorData: any) => {
        console.log('notification_readNotificationError=>', errorData);
        showMessage({
          type: 'danger',
          message: JSON.stringify(errorData),
          icon: 'danger',
        });
      },
    },
  );
};

export const useNotificationSubscription = ({userId}: {userId: number}) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const ws = new WebSocket(Config.API_URL, 'graphql-ws');
    ws.onopen = () => {
      console.log('connected');
      const notification = {
        id: '1',
        type: 'start',
        payload: {
          variables: {userId: userId},
          extensions: {},
          operationName: null,
          query: NOTIFICATION_ADDED,
        },
      };
      ws.send(JSON.stringify(notification));
    };
    ws.onmessage = event => {
      const notif = JSON.parse(event.data);
      if (notif?.type !== 'ka') {
        console.log({notif});
      }
      // if (msg.type == 'data') {
      //     const data = msg.payload.data.productAdded;
      //     queryClient.setQueriesData<Message_GetConversationQuery>(
      //         queryKeys.getConversations,
      //         (oldData: Message_GetConversationQuery) => {
      //             return {
      //                 ...oldData,
      //                 getLastProducts: [...oldData.getLastProducts, data],
      //             };
      //         },
      //     );
      // }
    };
    return () => {
      // Unsubscribe before exit
      ws.send(JSON.stringify({id: '1', type: 'stop'}));
      ws.close();
    };
  }, []);
};
