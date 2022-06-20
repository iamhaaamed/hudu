import React from 'react';
import {Box, HStack, Text} from 'native-base';
import {Colors} from '~/styles';
import {fontFamily, scale} from '~/utils/style';
import {userDataStore} from '~/stores';

const QuestionChildItem = ({item, listerId}: {item: any; listerId: number}) => {
  const {userData} = userDataStore(state => state);

  const curUser = userData?.id === item?.userId;
  const lister = listerId === item?.userId;

  return (
    <HStack space="4">
      <Box flex={0.15} />
      <HStack flex={0.85} space="4" px="4">
        <Text
          flex={0.2}
          numberOfLines={1}
          fontSize={scale(14)}
          fontFamily={fontFamily.medium}
          color={Colors.BLACK_1}>
          {curUser ? 'you' : lister ? 'Lister' : item?.user?.userName ?? 'user'}
          :
        </Text>
        <Text
          flex={0.8}
          fontSize={scale(14)}
          fontFamily={fontFamily.regular}
          color={Colors.PLACEHOLDER}>
          {item?.text}
        </Text>
      </HStack>
    </HStack>
  );
};

export default QuestionChildItem;
