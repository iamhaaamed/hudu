import React from 'react';
import {Spinner, IconButton} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '~/styles';
import {authStore, userDataStore} from '~/stores';
import {showMessage} from 'react-native-flash-message';
import {useProjectLike, useProjectUnLike} from '~/hooks/project';

const ProjectFavoriteIcon = ({
  isLiked,
  projectId,
  size = 18,
}: {
  isLiked?: boolean;
  projectId: number;
  size?: number;
}) => {
  const {isUserLoggedIn} = authStore(state => state);
  const {userData} = userDataStore(state => state);

  const {mutate: projectLikeMutate, isLoading: projectLikeLoading} =
    useProjectLike();
  const {mutate: projectUnLikeMutate, isLoading: projectUnLikeLoading} =
    useProjectUnLike();

  const onPressHandler = () => {
    if (isUserLoggedIn) {
      if (isLiked) {
        const input = {projectId, userId: userData?.id};
        projectUnLikeMutate(input, {
          onSuccess: () => {},
          onError: () => {},
        });
      } else {
        projectLikeMutate(projectId, {
          onSuccess: () => {},
          onError: () => {},
        });
      }
    } else {
      showMessage({
        message: 'You are not logged in',
        type: 'info',
        icon: 'info',
        position: 'center',
      });
    }
  };

  const loading = projectLikeLoading || projectUnLikeLoading;

  return (
    <IconButton
      disabled={loading}
      onPress={onPressHandler}
      bg={Colors.FAVORITE_RIPPLE}
      colorScheme={Colors.WHITE_RIPPLE}
      borderRadius="full"
      icon={
        loading ? (
          <Spinner size={size} color={Colors.BLACK} />
        ) : (
          <MaterialCommunityIcons
            name={isLiked ? 'heart' : 'heart-outline'}
            color={isLiked ? Colors.ERROR : Colors.BLACK}
            size={size}
          />
        )
      }
    />
  );
};

export default ProjectFavoriteIcon;
