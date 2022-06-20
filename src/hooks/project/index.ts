import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import {PAGE_SIZE} from '~/constants/pagination';
import graphQLClient from '~/graphql/graphQLClient';
import queryKeys from '~/constants/queryKeys';
import {
  ResponseStatus,
  Project_GetProjectQueryVariables,
  Project_GetProjectQuery,
  Project_GetProjectsQueryVariables,
  Project_GetProjectsQuery,
  Project_GetQuestionsQueryVariables,
  Project_GetQuestionsQuery,
  Project_GetUserLikeProjectQueryVariables,
  Project_GetUserLikeProjectQuery,
  Project_GetUserLikeProjectsQueryVariables,
  Project_GetUserLikeProjectsQuery,
  Project_AddFeedBackMutation,
  Project_AddFeedBackMutationVariables,
  Project_AddProjectMutationVariables,
  Project_AddProjectMutation,
  Project_AddQuestionMutationVariables,
  Project_AddQuestionMutation,
  Project_EditProjectMutationVariables,
  Project_EditProjectMutation,
  Project_FaileProjectMutation,
  Project_FaileProjectMutationVariables,
  Project_FinisheProjectMutationVariables,
  Project_FinisheProjectMutation,
  Project_UnlikeMutationVariables,
  Project_LikeMutation,
  Project_ReopenProjectMutation,
  Project_ReopenProjectMutationVariables,
  Project_UnlikeMutation,
} from '~/generated/graphql';
import {
  PROJECT_GET_PROJECT,
  PROJECT_GET_PROJECTS,
  PROJECT_GET_QUESTIONS,
  PROJECT_GET_USER_LIKE_PROJECT,
  PROJECT_GET_USER_LIKE_PROJECTS,
} from '~/graphql/project/queries';
import {
  PROJECT_ADD_FEED_BACK,
  PROJECT_ADD_PROJECT,
  PROJECT_ADD_QUESTION,
  PROJECT_EDIT_PROJECT,
  PROJECT_FAILE_PROJECT,
  PROJECT_FINISHE_PROJECT,
  PROJECT_LIKE,
  PROJECT_REOPEN_PROJECT,
  PROJECT_UNLIKE,
} from '~/graphql/project/mutations';
import {showMessage} from 'react-native-flash-message';
import {getResponseMessage} from '~/utils/helper';

export const useGetProject = (options: any = {}) => {
  const res = useQuery<
    Project_GetProjectQuery,
    any,
    Project_GetProjectQueryVariables,
    any
  >(
    [queryKeys.project, options],
    async () => {
      return graphQLClient.request(PROJECT_GET_PROJECT, options);
    },
    {
      ...options,
    },
  );

  return {
    ...res,
  };
};

export const useGetProjects = (options: any = {}) => {
  return useInfiniteQuery<
    Project_GetProjectsQuery,
    any,
    Project_GetProjectsQueryVariables,
    any
  >(
    [queryKeys.projects, options],
    async ({pageParam = 0}) => {
      return graphQLClient.request(PROJECT_GET_PROJECTS, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      });
    },
    {
      getNextPageParam: (
        lastPage: Project_GetProjectsQuery,
        allPages: Project_GetProjectsQuery[],
      ) => {
        if (lastPage?.project_getProjects?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.project_getProjects?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useGetQuestions = (options: any = {}) => {
  return useInfiniteQuery<
    Project_GetQuestionsQuery,
    any,
    Project_GetQuestionsQueryVariables,
    any
  >(
    [queryKeys.questions, options],
    async ({pageParam = 0}) => {
      return graphQLClient.request(PROJECT_GET_QUESTIONS, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      });
    },
    {
      getNextPageParam: (
        lastPage: Project_GetQuestionsQuery,
        allPages: Project_GetQuestionsQuery[],
      ) => {
        if (lastPage?.project_getQuestions?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.project_getQuestions?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useGetUserLikeProject = (options: any = {}) => {
  const res = useQuery<
    Project_GetUserLikeProjectQuery,
    any,
    Project_GetUserLikeProjectQueryVariables,
    any
  >(
    [queryKeys.userLikeProject],
    async () => {
      return graphQLClient.request(PROJECT_GET_USER_LIKE_PROJECT);
    },
    {
      ...options,
    },
  );

  return {
    ...res,
  };
};

export const useGetUserLikeProjects = (options: any = {}) => {
  return useInfiniteQuery<
    Project_GetUserLikeProjectsQuery,
    any,
    Project_GetUserLikeProjectsQueryVariables,
    any
  >(
    [queryKeys.userLikeProjects, options],
    async ({pageParam = 0}) => {
      return graphQLClient.request(PROJECT_GET_USER_LIKE_PROJECTS, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      });
    },
    {
      getNextPageParam: (
        lastPage: Project_GetUserLikeProjectsQuery,
        allPages: Project_GetUserLikeProjectsQuery[],
      ) => {
        if (
          lastPage?.project_getUserLikeProjects?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.project_getUserLikeProjects?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useAddFeedBack = () => {
  return useMutation<
    Project_AddFeedBackMutation,
    any,
    Project_AddFeedBackMutationVariables
  >(
    async (feedbackInput: any) => {
      return graphQLClient.request(PROJECT_ADD_FEED_BACK, {feedbackInput});
    },
    {
      onSuccess: () => {},
      onError: (errorData: any) => {
        console.log('project_addFeedBackError=>', errorData);
        showMessage({
          type: 'danger',
          message: JSON.stringify(errorData),
          icon: 'danger',
        });
      },
    },
  );
};

export const useAddProject = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Project_AddProjectMutation,
    any,
    Project_AddProjectMutationVariables
  >(
    async (addProjectInput: any) => {
      return graphQLClient.request(PROJECT_ADD_PROJECT, {addProjectInput});
    },
    {
      onSuccess: (successData: any) => {
        if (
          successData?.project_addProject?.status === ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.projects);
        }
      },
      onError: (errorData: any) => {
        console.log('project_addProjectError=>', errorData);
        showMessage({
          type: 'danger',
          message: JSON.stringify(errorData),
          icon: 'danger',
        });
      },
    },
  );
};

export const useAddQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Project_AddQuestionMutation,
    any,
    Project_AddQuestionMutationVariables
  >(
    async (questionInput: any) => {
      return graphQLClient.request(PROJECT_ADD_QUESTION, {questionInput});
    },
    {
      onSuccess: (successData: any) => {
        if (
          successData?.project_addQuestion?.status === ResponseStatus.Success
        ) {
          showMessage(
            getResponseMessage(successData?.project_addQuestion?.status),
          );
          queryClient.invalidateQueries(queryKeys.questions);
        }
      },
      onError: (errorData: any) => {
        console.log('project_addQuestionError=>', errorData);
        showMessage({
          type: 'danger',
          message: JSON.stringify(errorData),
          icon: 'danger',
        });
      },
    },
  );
};

export const useEditProject = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Project_EditProjectMutation,
    any,
    Project_EditProjectMutationVariables
  >(
    async (editProjectInput: any) => {
      return graphQLClient.request(PROJECT_EDIT_PROJECT, {editProjectInput});
    },
    {
      onSuccess: (successData: any) => {
        if (
          successData?.project_editProject?.status === ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.projects);
        }
      },
      onError: (errorData: any) => {
        console.log('project_editProjectError=>', errorData);
        showMessage({
          type: 'danger',
          message: JSON.stringify(errorData),
          icon: 'danger',
        });
      },
    },
  );
};

export const useFailProject = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Project_FaileProjectMutation,
    any,
    Project_FaileProjectMutationVariables
  >(
    async (projectId: any) => {
      return graphQLClient.request(PROJECT_FAILE_PROJECT, {projectId});
    },
    {
      onSuccess: (successData: any) => {
        if (
          successData?.project_faileProject?.status === ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.projects);
        }
      },
      onError: (errorData: any) => {
        console.log('project_failProjectError=>', errorData);
        showMessage({
          type: 'danger',
          message: JSON.stringify(errorData),
          icon: 'danger',
        });
      },
    },
  );
};

export const useFinishProject = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Project_FinisheProjectMutation,
    any,
    Project_FinisheProjectMutationVariables
  >(
    async (projectId: any) => {
      return graphQLClient.request(PROJECT_FINISHE_PROJECT, {projectId});
    },
    {
      onSuccess: (successData: any) => {
        if (
          successData?.project_finisheProject?.status === ResponseStatus.Success
        ) {
          // queryClient.invalidateQueries(queryKeys.projects);
          // queryClient.invalidateQueries(queryKeys.bids);
        }
      },
      onError: (errorData: any) => {
        console.log('project_finishProjectError=>', errorData);
        showMessage({
          type: 'danger',
          message: JSON.stringify(errorData),
          icon: 'danger',
        });
      },
    },
  );
};

export const useProjectLike = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Project_LikeMutation,
    any,
    Project_UnlikeMutationVariables
  >(
    async (projectId: any) => {
      return graphQLClient.request(PROJECT_LIKE, {projectId});
    },
    {
      onSuccess: (successData: any) => {
        if (successData?.project_like?.status === ResponseStatus.Success) {
          queryClient.invalidateQueries(queryKeys.projects);
          queryClient.invalidateQueries(queryKeys.project);
          queryClient.invalidateQueries(queryKeys.userLikeProjects);
        }
      },
      onError: (errorData: any) => {
        console.log('project_likeError=>', errorData);
        showMessage({
          type: 'danger',
          message: JSON.stringify(errorData),
          icon: 'danger',
        });
      },
    },
  );
};

export const useReOpenProject = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Project_ReopenProjectMutation,
    any,
    Project_ReopenProjectMutationVariables
  >(
    async (projectId: any) => {
      return graphQLClient.request(PROJECT_REOPEN_PROJECT, {projectId});
    },
    {
      onSuccess: (successData: any) => {
        if (
          successData?.project_reopenProject?.status === ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.projects);
        }
      },
      onError: (errorData: any) => {
        console.log('project_reopenProjectError=>', errorData);
        showMessage({
          type: 'danger',
          message: JSON.stringify(errorData),
          icon: 'danger',
        });
      },
    },
  );
};

export const useProjectUnLike = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Project_UnlikeMutation,
    any,
    Project_UnlikeMutationVariables
  >(
    async (input: any) => {
      return graphQLClient.request(PROJECT_UNLIKE, input);
    },
    {
      onSuccess: (successData: any) => {
        if (successData?.project_unlike?.status === ResponseStatus.Success) {
          queryClient.invalidateQueries(queryKeys.projects);
          queryClient.invalidateQueries(queryKeys.project);
          queryClient.invalidateQueries(queryKeys.userLikeProjects);
        }
      },
      onError: (errorData: any) => {
        console.log('project_unlikeError=>', errorData);
        showMessage({
          type: 'danger',
          message: JSON.stringify(errorData),
          icon: 'danger',
        });
      },
    },
  );
};
