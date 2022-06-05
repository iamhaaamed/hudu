import React from 'react';
import {Colors} from '~/styles';
import {Flex, VStack} from 'native-base';

export default function SectionReviewContainer({children}: ReactChildren) {
  return (
    <Flex py="8" px="4">
      <VStack
        shadow={4}
        overflow="hidden"
        borderRadius={12}
        bgColor={Colors.WHITE}>
        {children}
      </VStack>
    </Flex>
  );
}
