import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon, Center, Spinner} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale} from '~/utils/style';
import {Colors} from '~/styles';

const FavoriteIcon = () => {
  const [isActive, setIsActive] = useState(false);
  const loading = false;

  const onPressHandler = () => {
    setIsActive(prevState => !prevState);
  };

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
                name={isActive ? 'heart' : 'heart-outline'}
              />
            }
            size={scale(11)}
            color={isActive ? Colors.ERROR : Colors.BLACK}
          />
        )}
      </Center>
    </TouchableOpacity>
  );
};

export default FavoriteIcon;
