import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon, Center, Spinner} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale} from '~/utils/style';
import {Colors} from '~/styles';
import {authStore, userDataStore} from '~/stores';
import {showMessage} from 'react-native-flash-message';
import {useProjectLike, useProjectUnLike} from '~/hooks/project';

const ProjectFavoriteIcon = ({
  isLiked,
  projectId,
}: {
  isLiked?: boolean;
  projectId: number;
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
    <TouchableOpacity
      disabled={loading}
      activeOpacity={0.9}
      onPress={onPressHandler}>
      <Center p="1" borderRadius="full" bg={Colors.WHITE}>
        {loading ? (
          <Spinner size={scale(9)} color={Colors.BLACK} />
        ) : (
          <Icon
            as={
              <MaterialCommunityIcons
                name={isLiked ? 'heart' : 'heart-outline'}
              />
            }
            size={scale(11)}
            color={isLiked ? Colors.ERROR : Colors.BLACK}
          />
        )}
      </Center>
    </TouchableOpacity>
  );
};

export default ProjectFavoriteIcon;
