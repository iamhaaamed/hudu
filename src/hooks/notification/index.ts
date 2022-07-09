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
  NOTIFICATION_DELETE_NOTIFICATION,
} from '~/graphql/notification/mutations';
import {
  Notification_AddNotificationMutation,
  Notification_AddNotificationMutationVariables,
  Notification_GetNotificationsQuery,
  Notification_GetNotificationsQueryVariables,
  Notification_ReadNotificationMutation,
  Notification_ReadNotificationMutationVariables,
  Notification_DeleteNotificationMutationVariables,
  Notification_DeleteNotificationMutation,
  ResponseStatus,
} from '~/generated/graphql';
import {showMessage} from 'react-native-flash-message';
import {Config} from 'react-native-config';
import {getResponseMessage} from '~/utils/helper';

export const useGetNotifications = (options: any = {}) => {
  return useInfiniteQuery<
    Notification_GetNotificationsQuery,
    any,
    Notification_GetNotificationsQueryVariables,
    any
  >(
    [queryKeys.notifications],
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
          totalCount:
            data?.pages?.[0]?.notification_getNotifications?.result?.totalCount,
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

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Notification_DeleteNotificationMutation,
    any,
    Notification_DeleteNotificationMutationVariables
  >(
    async (notificationId: any) => {
      return graphQLClient.request(NOTIFICATION_DELETE_NOTIFICATION, {
        notificationId,
      });
    },
    {
      onSuccess: successData => {
        console.log({successData});
        if (
          successData?.notification_deleteNotification?.status ===
          ResponseStatus.Success
        ) {
          showMessage(
            getResponseMessage(
              successData?.notification_deleteNotification?.status,
            ),
          );
          queryClient.invalidateQueries(queryKeys.notifications);
        } else {
          showMessage(
            getResponseMessage(
              successData?.notification_deleteNotification?.status,
            ),
          );
        }
      },
      onError: (errorData: any) => {
        console.log('notification_deleteNotificationError=>', errorData);
        showMessage({
          type: 'danger',
          message: JSON.stringify(errorData),
          icon: 'danger',
        });
      },
    },
  );
};

export const useNotificationSubscription = ({
  userId,
  callback,
}: {
  userId: number;
  callback: () => void;
}) => {
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
    ws.onmessage = callback;
    return () => {
      // Unsubscribe before exit
      ws.send(JSON.stringify({id: '1', type: 'stop'}));
      ws.close();
    };
  }, []);
};
