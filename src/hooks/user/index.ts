import {useMutation, useQuery, useQueryClient} from 'react-query';
import graphQLClient from '~/graphql/graphQLClient';
import queryKeys from '~/constants/queryKeys';
import {USER_GET_PROFILE} from '~/graphql/user/queries';
import {
  ResponseStatus,
  User_GetProfileQuery,
  User_GetProfileQueryVariables,
  User_LoginQuery,
  User_LoginQueryVariables,
  User_SignUpMutation,
  User_SignUpMutationVariables,
  User_UpdateLastSeenMutation,
  User_UpdateLastSeenMutationVariables,
  User_UpdateProfileMutation,
  User_UpdateProfileMutationVariables,
} from '~/generated/graphql';
import {
  USER_LOGIN,
  USER_SIGN_UP,
  USER_UPDATE_LAST_SEEN,
  USER_UPDATE_PROFILE,
} from '~/graphql/user/mutations';
import {showMessage} from 'react-native-flash-message';

export const useGetProfile = (options: any = {}) => {
  const res = useQuery<
    User_GetProfileQuery,
    any,
    User_GetProfileQueryVariables,
    any
  >(
    [queryKeys.userProfile],
    async () => {
      return graphQLClient.request(USER_GET_PROFILE);
    },
    {
      ...options,
    },
  );

  return {
    ...res,
  };
};

export const useLogin = () => {
  return useMutation<User_LoginQuery, any, User_LoginQueryVariables>(
    async () => {
      return graphQLClient.request(USER_LOGIN);
    },
    {
      onSuccess: () => {},
      onError: (errorData: any) => {
        console.log('user_loginError=>', errorData);
        showMessage({type: 'danger', message: JSON.stringify(errorData)});
      },
    },
  );
};

export const useSignUp = () => {
  return useMutation<User_SignUpMutation, any, User_SignUpMutationVariables>(
    async () => {
      return graphQLClient.request(USER_SIGN_UP);
    },
    {
      onSuccess: () => {},
      onError: (errorData: any) => {
        console.log('user_signUpError=>', errorData);
        showMessage({type: 'danger', message: JSON.stringify(errorData)});
      },
    },
  );
};

export const useUpdateLastSeen = () => {
  return useMutation<
    User_UpdateLastSeenMutation,
    any,
    User_UpdateLastSeenMutationVariables
  >(
    async () => {
      return graphQLClient.request(USER_UPDATE_LAST_SEEN);
    },
    {
      onSuccess: () => {},
      onError: (errorData: any) => {
        console.log('user_UpdateLastSeenError=>', errorData);
        showMessage({type: 'danger', message: JSON.stringify(errorData)});
      },
    },
  );
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<
    User_UpdateProfileMutation,
    any,
    User_UpdateProfileMutationVariables
  >(
    async (userInput: any) => {
      return graphQLClient.request(USER_UPDATE_PROFILE, {userInput});
    },
    {
      onSuccess: (successData: any) => {
        if (
          successData?.user_updateProfile?.status === ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.userProfile);
        }
      },
      onError: (errorData: any) => {
        console.log('user_updateProfileError=>', errorData);
        showMessage({type: 'danger', message: JSON.stringify(errorData)});
      },
    },
  );
};
