import React, {useMemo} from 'react';
import {Text, Box, HStack} from 'native-base';
import {Colors} from '~/styles';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import dayjs from 'dayjs';

const TimeLeftLabel = ({time}: {time: any}) => {
  const status = useMemo(() => {
    const projectDeadLine = dayjs().diff(time, 'day');
    if (projectDeadLine < 1) {
      return {
        days: projectDeadLine,
        backgroundColor: Colors.TIME_LEFT_RED,
        color: Colors.WHITE,
      };
    } else if (projectDeadLine >= 1 && projectDeadLine < 3) {
      return {
        days: projectDeadLine,
        backgroundColor: Colors.TIME_LEFT_ORANGE,
        color: Colors.BLACK_1,
      };
    } else if (projectDeadLine >= 3 && projectDeadLine < 7) {
      return {
        days: projectDeadLine,
        backgroundColor: Colors.BLACK_1,
        color: Colors.WHITE,
      };
    } else {
      return {
        days: projectDeadLine,
        backgroundColor: Colors.BLACK_1,
        color: Colors.WHITE,
      };
    }
  }, [time]);

  return (
    <HStack alignItems="center" w="100%" h={verticalScale(24)}>
      <Box
        w="100%"
        h="100%"
        position="absolute"
        bg={status?.backgroundColor}
        opacity={0.8}
      />
      <Text
        mx="2"
        zIndex={10}
        color={status?.color}
        fontSize={scale(11)}
        fontFamily={fontFamily.medium}>
        Time left:{status?.days} Days
      </Text>
    </HStack>
  );
};

export default TimeLeftLabel;
