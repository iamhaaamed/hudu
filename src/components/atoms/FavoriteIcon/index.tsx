import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon, Center, Spinner} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale} from '~/utils/style';
import {Colors} from '~/styles';
import {authStore, userDataStore} from '~/stores';
import {useProjectUnLike} from '~/hooks/project';

const FavoriteIcon = ({
  isLiked,
  projectId,
}: {
  isLiked?: boolean;
  projectId: number;
}) => {
  const {isUserLoggedIn} = authStore(state => state);
  const {userData} = userDataStore(state => state);

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
      }
    }
  };

  const loading = projectUnLikeLoading;

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

export default FavoriteIcon;
