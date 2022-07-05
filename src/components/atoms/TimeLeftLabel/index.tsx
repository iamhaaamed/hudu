import React, {useMemo} from 'react';
import {Text, Box, HStack} from 'native-base';
import {Colors} from '~/styles';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import dayjs from 'dayjs';

const TimeLeftLabel = ({time}: {time: any}) => {
  const status = useMemo(() => {
    const date1 = dayjs(time);
    const current = dayjs();
    const projectDeadLine = date1.diff(current, 'day', true);

    const days = Math.floor(projectDeadLine);
    const hours = Math.floor((projectDeadLine - days) * 24);

    if (projectDeadLine < 1) {
      return {
        days: days,
        hours: hours,
        backgroundColor: Colors.TIME_LEFT_RED,
        color: Colors.WHITE,
      };
    } else if (projectDeadLine >= 1 && projectDeadLine < 3) {
      return {
        days: days,
        hours: hours,
        backgroundColor: Colors.TIME_LEFT_ORANGE,
        color: Colors.BLACK_1,
      };
    } else if (projectDeadLine >= 3 && projectDeadLine < 7) {
      return {
        days: days,
        hours: hours,
        backgroundColor: Colors.BLACK_1,
        color: Colors.WHITE,
      };
    } else {
      return {
        days: days,
        hours: hours,
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
        Time left:
        {status?.days
          ? status?.days > 1
            ? `${status?.days} Days`
            : `${status?.days} Day`
          : ''}
        {status?.hours > 0
          ? status?.hours > 1
            ? `, ${status?.days} hours`
            : `, ${status?.days} hour`
          : ''}
      </Text>
    </HStack>
  );
};

export default TimeLeftLabel;
