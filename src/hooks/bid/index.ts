import {useInfiniteQuery, useMutation, useQueryClient} from 'react-query';
import {PAGE_SIZE} from '~/constants/pagination';
import graphQLClient from '~/graphql/graphQLClient';
import queryKeys from '~/constants/queryKeys';
import {BID_GET_BIDS} from '~/graphql/bid/queries';
import {
  ResponseStatus,
  Bid_AcceptBidMutation,
  Bid_AcceptBidMutationVariables,
  Bid_AddBidMutation,
  Bid_AddBidMutationVariables,
  Bid_GetBidsQuery,
  Bid_GetBidsQueryVariables,
  Bid_RejectBidMutation,
  Bid_RejectBidMutationVariables,
  Bid_CancellBidMutation,
  Bid_CancellBidMutationVariables,
  Bid_DeleteBidMutationVariables,
  Bid_DeleteBidMutation,
  Bid_EditBidMutation,
  Bid_EditBidMutationVariables,
} from '~/generated/graphql';
import {showMessage} from 'react-native-flash-message';
import {getResponseMessage} from '~/utils/helper';
import {
  BID_ACCEPT_BID,
  BID_REJECT_BID,
  BID_ADD_BID,
  BID_CANCELL_BID,
  BID_DELETE_BID,
  BID_EDIT_BID,
} from '~/graphql/bid/mutations';

export const useGetBids = (options: any = {}) => {
  return useInfiniteQuery<
    Bid_GetBidsQuery,
    any,
    Bid_GetBidsQueryVariables,
    any
  >(
    [queryKeys.bids, options],
    async ({pageParam = 0}) => {
      return graphQLClient.request(BID_GET_BIDS, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      });
    },
    {
      getNextPageParam: (
        lastPage: Bid_GetBidsQuery,
        allPages: Bid_GetBidsQuery[],
      ) => {
        if (lastPage?.bid_getBids?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages?.map(a => a?.bid_getBids?.result?.items).flat(),
        };
      },
      ...options,
    },
  );
};

export const useAcceptBid = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Bid_AcceptBidMutation,
    any,
    Bid_AcceptBidMutationVariables
  >(
    async (bidId: any) => {
      return graphQLClient.request(BID_ACCEPT_BID, {bidId});
    },
    {
      onSuccess: (successData: any) => {
        if (successData?.bid_acceptBid?.status === ResponseStatus.Success) {
          queryClient.invalidateQueries(queryKeys.bids);
        } else {
          showMessage(getResponseMessage(successData?.bid_acceptBid?.status));
        }
      },
      onError: (errorData: any) => {
        console.log('bid_acceptBidError=>', errorData);
        showMessage({
          type: 'danger',
          message: JSON.stringify(errorData),
          icon: 'danger',
        });
      },
    },
  );
};

export const useRejectBid = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Bid_RejectBidMutation,
    any,
    Bid_RejectBidMutationVariables
  >(
    async (bidId: any) => {
      return graphQLClient.request(BID_REJECT_BID, {bidId});
    },
    {
      onSuccess: (successData: any) => {
        if (successData?.bid_rejectBid?.status === ResponseStatus.Success) {
          queryClient.invalidateQueries(queryKeys.bids);
        } else {
          showMessage(getResponseMessage(successData?.bid_rejectBid?.status));
        }
      },
      onError: (errorData: any) => {
        console.log('bid_rejectBidError=>', errorData);
        showMessage({
          type: 'danger',
          message: JSON.stringify(errorData),
          icon: 'danger',
        });
      },
    },
  );
};

export const useAddBid = () => {
  const queryClient = useQueryClient();
  return useMutation<Bid_AddBidMutation, any, Bid_AddBidMutationVariables>(
    async (bidInput: any) => {
      return graphQLClient.request(BID_ADD_BID, {bidInput});
    },
    {
      onSuccess: (successData: any) => {
        if (successData?.bid_addBid?.status === ResponseStatus.Success) {
          queryClient.invalidateQueries(queryKeys.bids);
          showMessage(getResponseMessage(successData?.bid_addBid?.status));
        } else {
          showMessage(getResponseMessage(successData?.bid_addBid?.status));
        }
      },
      onError: (errorData: any) => {
        console.log('bid_addBidError=>', errorData);
        showMessage({
          type: 'danger',
          message: JSON.stringify(errorData),
          icon: 'danger',
        });
      },
    },
  );
};

export const useCancelBid = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Bid_CancellBidMutation,
    any,
    Bid_CancellBidMutationVariables
  >(
    async (bidId: any) => {
      return graphQLClient.request(BID_CANCELL_BID, {bidId});
    },
    {
      onSuccess: (successData: any) => {
        if (successData?.bid_cancellBid?.status === ResponseStatus.Success) {
          queryClient.invalidateQueries(queryKeys.bids);
          showMessage(getResponseMessage(successData?.bid_cancellBid?.status));
        } else {
          showMessage(getResponseMessage(successData?.bid_cancellBid?.status));
        }
      },
      onError: (errorData: any) => {
        console.log('bid_cancellBidError=>', errorData);
        showMessage({
          type: 'danger',
          message: JSON.stringify(errorData),
          icon: 'danger',
        });
      },
    },
  );
};

export const useDeleteBid = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Bid_DeleteBidMutation,
    any,
    Bid_DeleteBidMutationVariables
  >(
    async (bidId: any) => {
      return graphQLClient.request(BID_DELETE_BID, {bidId});
    },
    {
      onSuccess: (successData: any) => {
        if (successData?.bid_DeleteBid?.status === ResponseStatus.Success) {
          queryClient.invalidateQueries(queryKeys.bids);
          queryClient.invalidateQueries(queryKeys.projects);
          showMessage(getResponseMessage(successData?.bid_DeleteBid?.status));
        } else {
          showMessage(getResponseMessage(successData?.bid_DeleteBid?.status));
        }
      },
      onError: (errorData: any) => {
        console.log('bid_DeleteBidError=>', errorData);
        showMessage({
          type: 'danger',
          message: JSON.stringify(errorData),
          icon: 'danger',
        });
      },
    },
  );
};

export const useEditBid = () => {
  const queryClient = useQueryClient();
  return useMutation<Bid_EditBidMutation, any, Bid_EditBidMutationVariables>(
    async (editBidInput: any) => {
      return graphQLClient.request(BID_EDIT_BID, {editBidInput});
    },
    {
      onSuccess: (successData: any) => {
        if (successData?.bid_editBid?.status === ResponseStatus.Success) {
          showMessage(getResponseMessage(successData?.bid_editBid?.status));
          queryClient.invalidateQueries(queryKeys.bids);
          queryClient.invalidateQueries(queryKeys.projects);
        } else {
          showMessage(getResponseMessage(successData?.bid_editBid?.status));
        }
      },
      onError: (errorData: any) => {
        console.log('bid_editBidError=>', errorData);
        showMessage({
          type: 'danger',
          message: JSON.stringify(errorData),
          icon: 'danger',
        });
      },
    },
  );
};
