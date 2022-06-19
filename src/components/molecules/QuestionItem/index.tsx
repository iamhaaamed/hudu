import React from 'react';
import {Box, HStack, Text, VStack} from 'native-base';
import {Colors} from '~/styles';
import {fontFamily, scale} from '~/utils/style';
import {userDataStore} from '~/stores';

const QuestionItem = ({item, listerId}: {item: any; listerId: number}) => {
  const {userData} = userDataStore(state => state);

  const currentUser = userData?.id === item?.userId;
  const isLister = listerId === item?.userId;

  return (
    <VStack space="2">
      <HStack space="4" px="4">
        <Text
          numberOfLines={1}
          flex={0.15}
          fontSize={scale(14)}
          fontFamily={fontFamily.medium}
          color={Colors.BLACK_1}>
          {currentUser
            ? 'you'
            : isLister
            ? 'Lister'
            : item?.user?.userName ?? 'user'}
          :
        </Text>
        <Text
          flex={0.85}
          fontSize={scale(14)}
          fontFamily={fontFamily.regular}
          color={Colors.PLACEHOLDER}>
          {item?.text}
        </Text>
      </HStack>
      {item?.childrenQuestions?.map((element: any, indx: number) => {
        const curUser = userData?.id === element?.userId;
        const lister = listerId === element?.userId;

        return (
          <HStack key={indx} space="4">
            <Box flex={0.15} />
            <HStack flex={0.85} space="4" px="4">
              <Text
                flex={0.2}
                numberOfLines={1}
                fontSize={scale(14)}
                fontFamily={fontFamily.medium}
                color={Colors.BLACK_1}>
                {curUser
                  ? 'you'
                  : lister
                  ? 'Lister'
                  : element?.user?.userName ?? 'user'}
                :
              </Text>
              <Text
                flex={0.8}
                fontSize={scale(14)}
                fontFamily={fontFamily.regular}
                color={Colors.PLACEHOLDER}>
                {element?.text}
              </Text>
            </HStack>
          </HStack>
        );
      })}
    </VStack>
  );
};

export default QuestionItem;
