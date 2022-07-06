import React, {useMemo} from 'react';
import {Text, Box, HStack} from 'native-base';
import {Colors} from '~/styles';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import dayjs from 'dayjs';

const TimeLeftLabel = ({time, type = 'public'}: {time: any; type?: string}) => {
  const status = useMemo(() => {
    const date1 = dayjs(time);
    const current = dayjs();
    const projectDeadLine = date1.diff(current, 'millisecond', true);

    const days = dayjs(projectDeadLine).get('day');
    const hours = dayjs(projectDeadLine).get('hour');
    const minutes = dayjs(projectDeadLine).get('minute');

    if (projectDeadLine < 1) {
      return {
        days,
        hours,
        minutes,
        backgroundColor: Colors.TIME_LEFT_RED,
        color: Colors.WHITE,
      };
    } else if (projectDeadLine >= 1 && projectDeadLine < 3) {
      return {
        days,
        hours,
        minutes,
        backgroundColor: Colors.TIME_LEFT_ORANGE,
        color: Colors.BLACK_1,
      };
    } else if (projectDeadLine >= 3 && projectDeadLine < 7) {
      return {
        days,
        hours,
        minutes,
        backgroundColor: Colors.BLACK_1,
        color: Colors.WHITE,
      };
    } else {
      return {
        days,
        hours,
        minutes,
        backgroundColor: Colors.BLACK_1,
        color: Colors.WHITE,
      };
    }
  }, [time]);

  return (
    <>
      {type === 'public' ? (
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
            fontSize={scale(10)}
            fontFamily={fontFamily.medium}>
            Time left:
            {status?.days
              ? status?.days > 1
                ? `${status?.days} Days`
                : `${status?.days} Day`
              : ''}
            {status?.hours > 0
              ? status?.hours > 1
                ? `, ${status?.hours} h`
                : `, ${status?.hours} h`
              : ''}
            {status?.minutes > 0
              ? status?.minutes > 1
                ? `, ${status?.minutes} m`
                : `, ${status?.minutes} m`
              : ''}
          </Text>
        </HStack>
      ) : (
        <HStack alignItems="center" justifyContent="space-between">
          <Text
            fontSize={scale(16)}
            fontFamily={fontFamily.regular}
            color={Colors.BLACK_1}>
            Time left
          </Text>
          <Text
            fontSize={scale(16)}
            fontFamily={fontFamily.regular}
            color={Colors.BLACK_3}>
            {status?.days
              ? status?.days > 1
                ? `${status?.days} Days`
                : `${status?.days} Day`
              : ''}
            {status?.hours > 0
              ? status?.hours > 1
                ? `, ${status?.hours} h`
                : `, ${status?.hours} h`
              : ''}
            {status?.minutes > 0
              ? status?.minutes > 1
                ? `, ${status?.minutes} m`
                : `, ${status?.minutes} m`
              : ''}
          </Text>
        </HStack>
      )}
    </>
  );
};

export default TimeLeftLabel;
