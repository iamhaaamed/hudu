import React, {useState} from 'react';
import Config from 'react-native-config';
import auth from '@react-native-firebase/auth';
import queryKeys from '~/constants/queryKeys';
import graphQLClient from '~/graphql/graphQLClient';
import {showMessage} from 'react-native-flash-message';
import {USER_GET_PROFILE} from '~/graphql/user/queries';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {
  ResponseStatus,
  User_LoginQuery,
  User_GetProfileQuery,
  User_SignUpMutation,
  User_LoginQueryVariables,
  User_UpdateProfileMutation,
  User_UpdateLastSeenMutation,
  User_GetProfileQueryVariables,
  User_SignUpMutationVariables,
  User_UpdateProfileMutationVariables,
  User_UpdateLastSeenMutationVariables,
} from '~/generated/graphql';
import {
  USER_LOGIN,
  USER_SIGN_UP,
  USER_UPDATE_PROFILE,
  USER_UPDATE_LAST_SEEN,
} from '~/graphql/user/mutations';
import {
  statusCodes,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import {
  Profile,
  Settings,
  AccessToken,
  GraphRequest,
  LoginManager,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import {getResponseMessage} from '~/utils/helper';
import {authStore, userDataStore} from '~/stores';
import {resetRoot, goBack} from '~/navigation/Methods';

GoogleSignin.configure({
  scopes: ['profile', 'email'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: Config.GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  // @ts-ignore
  loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId: Config.GOOGLE_IOS_CLIENT_ID, // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
});

Settings.setAppID('1284604992070625');

export const useSignUpAuth = () => {
  const signUpWithEmailAndPass = async (email: string, password: string) => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (response?.additionalUserInfo?.isNewUser) {
        const idToken = await auth().currentUser?.getIdToken();
        console.log('idToken: ', idToken);
        if (idToken) {
          graphQLClient.setHeader('authorization', 'Bearer ' + idToken);
          return {data: idToken, error: null, loading: false};
        } else {
          return {data: null, error: response, loading: false};
        }
      } else {
        return {data: null, error: response, loading: false};
      }
    } catch (errorData: any) {
      const errorMessage = errorData?.message;
      if (errorMessage) {
        showMessage({
          message: errorMessage,
          type: 'danger',
          icon: 'danger',
        });
      }
      return {data: null, error: errorData, loading: false};
    }
  };

  return {signUpWithEmailAndPass};
};

export const useLoginAuth = () => {
  const loginWithEmailAndPass = async (email: string, password: string) => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      if (response?.user) {
        const idToken = await auth().currentUser?.getIdToken();
        console.log('idToken: ', idToken);
        if (idToken) {
          graphQLClient.setHeader('authorization', 'Bearer ' + idToken);
          return {data: idToken, error: null, loading: false};
        } else {
          return {data: null, error: response, loading: false};
        }
      } else {
        return {data: null, error: response, loading: false};
      }
    } catch (errorData: any) {
      const errorMessage = errorData?.message;
      if (errorMessage) {
        showMessage({
          message: errorMessage,
          type: 'danger',
          icon: 'danger',
        });
      }
      return {data: null, error: errorData, loading: false};
    }
  };

  return {loginWithEmailAndPass};
};

export const useForgotPasswordAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  const forgotPassword = async (email: string) => {
    setLoading(true);
    try {
      await auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          showMessage({
            message: 'Email sent successfully',
            type: 'success',
            icon: 'success',
          });
          goBack();
          setIsSuccess(true);
          setError(false);
          setLoading(false);
        })
        .catch((errorData: any) => {
          console.log(error, 'error');
          setIsSuccess(false);
          setError(errorData);
          setLoading(false);
          const errorMessage = errorData?.message;
          if (errorMessage) {
            showMessage({
              message: errorMessage,
              type: 'danger',
              icon: 'danger',
            });
          }
        });
    } catch (err: any) {
      console.log(err, 'err*****');
      setIsSuccess(false);
      setError(err);
      setLoading(false);
    }
  };

  return {forgotPassword, loading, isSuccess, error};
};

export const useGetProfile = (options: any = {}) => {
  const res = useQuery<
    User_GetProfileQuery,
    any,
    User_GetProfileQueryVariables,
    any
  >(
    [queryKeys.userProfile, options],
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
  const {setIsUserLoggedIn} = authStore(state => state);
  const {setUserData} = userDataStore(state => state);

  return useMutation<User_LoginQuery, any, User_LoginQueryVariables>(
    async () => {
      return graphQLClient.request(USER_LOGIN);
    },
    {
      onSuccess: (successData: any) => {
        if (successData.user_login?.status === ResponseStatus.Success) {
          setUserData(successData.user_login?.result);
          setIsUserLoggedIn(true);
          showMessage({
            message: 'You are logged in successfully',
            type: 'success',
            icon: 'success',
          });
          resetRoot('MainTabs');
        } else {
          showMessage(getResponseMessage(successData.user_login?.status));
        }
      },
      onError: (errorData: any) => {
        console.log('user_loginError=>', errorData);
        showMessage({
          type: 'danger',
          message: JSON.stringify(errorData),
          icon: 'danger',
        });
      },
    },
  );
};

export const useSignUp = () => {
  const {setIsUserLoggedIn} = authStore(state => state);
  const {setUserData} = userDataStore(state => state);

  return useMutation<User_SignUpMutation, any, User_SignUpMutationVariables>(
    async () => {
      return graphQLClient.request(USER_SIGN_UP);
    },
    {
      onSuccess: (successData: any) => {
        if (successData.user_signUp?.status === ResponseStatus.Success) {
          setIsUserLoggedIn(true);
          setUserData(successData.user_signUp?.result);
          showMessage({
            message: 'You have successfully registered',
            type: 'success',
            icon: 'success',
          });
        } else {
          showMessage(getResponseMessage(successData.user_signUp?.status));
        }
      },
      onError: (errorData: any) => {
        console.log('user_signUpError=>', errorData);
        showMessage({
          type: 'danger',
          message: JSON.stringify(errorData),
          icon: 'danger',
        });
      },
    },
  );
};

export const useGoogleAuth = () => {
  const {signOut} = useSignOutAuth();

  const signInWithGoogle = async () => {
    try {
      signOut();
      await GoogleSignin.hasPlayServices();
      const googleResponse = await GoogleSignin.signIn();
      const email = googleResponse?.user?.email;
      if (!email) {
        throw new Error('Please accept the email permission');
      }

      const idToken = googleResponse?.idToken;
      if (idToken) {
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        await auth().signInWithCredential(googleCredential);
        const currentUser = auth().currentUser;
        const fbIdToken = await currentUser?.getIdToken();
        console.log({fbIdToken});
        graphQLClient.setHeader('authorization', 'Bearer ' + fbIdToken);
        return {
          data: googleResponse,
          success: true,
          loading: false,
          error: false,
        };
      } else {
        return {
          data: null,
          success: false,
          loading: false,
          error: null,
        };
      }
    } catch (err: any) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        return {
          data: null,
          success: false,
          loading: false,
          error: 'Cancelled by user',
        };
      } else if (err.code === statusCodes.IN_PROGRESS) {
        return {
          data: null,
          success: false,
          loading: false,
          error: 'SignIn in progress',
        };
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return {
          data: null,
          success: false,
          loading: false,
          error: 'Google play services not available',
        };
      } else {
        return {
          data: null,
          success: false,
          loading: false,
          error: err,
        };
      }
    }
  };

  return {signInWithGoogle};
};

export const useFacebookAuth = () => {
  const {signOut} = useSignOutAuth();

  const signInWithFacebook = async () => {
    try {
      signOut();
      LoginManager.logOut();
      const fbResult = await LoginManager.logInWithPermissions([
        'email',
        'public_profile',
      ]);
      if (
        fbResult &&
        !fbResult.isCancelled &&
        fbResult.declinedPermissions &&
        fbResult.declinedPermissions.includes('email')
      ) {
        return {
          data: null,
          success: false,
          loading: false,
          error: 'Please accept the email permission',
        };
      }
      if (fbResult.isCancelled) {
        return {
          data: null,
          success: false,
          loading: false,
          error: 'Cancelled by user',
        };
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data || !data.accessToken) {
        return {
          data: null,
          success: false,
          loading: false,
          error: "Couldn't obtain access token",
        };
      }
      const accessToken = data.accessToken;
      const currentProfile = await getProfile(accessToken);
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      await auth().signInWithCredential(facebookCredential);
      const currentUser = auth().currentUser;
      const fbIdToken = await currentUser?.getIdToken();
      console.log({fbIdToken});
      graphQLClient.setHeader('authorization', 'Bearer ' + fbIdToken);
      return {
        data: {
          fbIdToken,
          fullResult: {
            user: currentProfile,
            loginResult: fbResult,
          },
        },
        success: true,
        loading: false,
        error: false,
      };
    } catch (err: any) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        return {
          data: null,
          success: false,
          loading: false,
          error: 'Cancelled by user',
        };
      } else if (err.code === statusCodes.IN_PROGRESS) {
        return {
          data: null,
          success: false,
          loading: false,
          error: 'SignIn in progress',
        };
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return {
          data: null,
          success: false,
          loading: false,
          error: 'Google play services not available',
        };
      } else {
        return {
          data: null,
          success: false,
          loading: false,
          error: err,
        };
      }
    }
  };

  const getProfile = async (accessToken: any) => {
    const currentProfile = await Profile.getCurrentProfile();
    if (!currentProfile || !currentProfile.email) {
      const graphProfile = await _fetchProfileWithGraph(accessToken);
      return graphProfile;
    } else {
      return currentProfile;
    }
  };

  const _fetchProfileWithGraph = async (accessToken: any) => {
    return new Promise((resolve, reject) => {
      const infoRequest = new GraphRequest(
        '/me',
        {
          accessToken,
          parameters: {
            fields: {
              string: 'email,name,first_name,middle_name,last_name',
            },
          },
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
      new GraphRequestManager().addRequest(infoRequest).start();
    });
  };

  return {signInWithFacebook};
};

export const useSignOutAuth = () => {
  const signOut = async () => {
    const firebaseAuth = auth();
    if (firebaseAuth.currentUser) {
      await firebaseAuth.signOut();
    }
  };

  return {signOut};
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
        showMessage({
          type: 'danger',
          message: JSON.stringify(errorData),
          icon: 'danger',
        });
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
          showMessage(
            getResponseMessage(successData.user_updateProfile?.status),
          );
          goBack();
        }
      },
      onError: (errorData: any) => {
        console.log('user_updateProfileError=>', errorData);
        showMessage({
          type: 'danger',
          message: JSON.stringify(errorData),
          icon: 'danger',
        });
      },
    },
  );
};
