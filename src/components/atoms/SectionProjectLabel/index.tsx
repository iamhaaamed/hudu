import React from 'react';
import {Text, Center} from 'native-base';
import {scale, fontFamily} from '~/utils/style';
import {Colors} from '~/styles';

const SectionProjectLabel = ({item}: {item?: any}) => {
  return (
    <Center borderRadius="md" bg={Colors.WAITING_BACKGROUND}>
      <Text
        px="4"
        zIndex={11}
        fontSize={scale(14)}
        fontFamily={fontFamily.regular}
        color={Colors.INFO}>
        Waiting
      </Text>
    </Center>
  );
};

export default SectionProjectLabel;
