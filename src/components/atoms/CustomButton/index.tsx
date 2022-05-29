import React from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import {Colors, Spacing} from '~/styles';
import {Box, Center, Text} from 'native-base';
import {fontFamily, scale, verticalScale} from '~/utils/style';

export default function CustomButton({
  title,
  loading,
  onPress,
  outline = false,
  color = Colors.PRIMARY,
  spinnerColor = Colors.WHITE,
  width = '100%',
  height = verticalScale(45),
  borderRadius = 'lg',
}: {
  title: string | undefined;
  loading?: boolean;
  onPress: any;
  outline?: boolean;
  color?: string;
  spinnerColor?: any;
  width?: any;
  height?: any;
  borderRadius?: any;
}) {
  const onPressHandler = () => {
    onPress?.();
  };

  return (
    <TouchableOpacity
      style={[{width}]}
      onPress={onPressHandler}
      disabled={loading}
      activeOpacity={0.7}>
      <Box
        w={width}
        h={height}
        borderRadius={borderRadius}
        shadow={outline ? undefined : '1'}
        bg={outline ? 'transparent' : color}
        borderWidth={outline ? 1 : 0}
        borderColor={outline ? color : undefined}>
        <Center flex={1}>
          {loading ? (
            <ActivityIndicator size={Spacing.larger} color={spinnerColor} />
          ) : (
            <Text
              fontSize={scale(14)}
              fontFamily={fontFamily.bold}
              color={outline ? color : Colors.WHITE}>
              {title}
            </Text>
          )}
        </Center>
      </Box>
    </TouchableOpacity>
  );
}
