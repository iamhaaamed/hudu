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
  borderColor,
  textColor,
  spinnerColor = Colors.WHITE,
  width = '100%',
  height = verticalScale(45),
  borderRadius = 'lg',
  fontSize = scale(14),
  font_family = fontFamily.regular,
}: {
  title: string | undefined;
  loading?: boolean;
  onPress: any;
  outline?: boolean;
  color?: string;
  borderColor?: string;
  textColor?: string;
  spinnerColor?: any;
  width?: any;
  height?: any;
  borderRadius?: any;
  fontSize?: number;
  font_family?: any;
}) {
  const onPressHandler = () => {
    onPress?.();
  };

  return (
    <Box
      w={width}
      h={height}
      overflow="hidden"
      borderRadius={borderRadius}
      shadow={outline ? undefined : '1'}
      bg={outline ? 'transparent' : color}
      borderWidth={outline ? 1 : borderColor ? 1 : 0}
      borderColor={outline ? color : borderColor ? borderColor : undefined}>
      <TouchableOpacity
        style={[{width, height}]}
        onPress={onPressHandler}
        disabled={loading}
        activeOpacity={0.7}>
        <Center flex={1}>
          {loading ? (
            <ActivityIndicator size={Spacing.larger} color={spinnerColor} />
          ) : (
            <Text
              fontSize={fontSize}
              fontFamily={font_family}
              color={outline ? color : textColor ? textColor : Colors.WHITE}>
              {title}
            </Text>
          )}
        </Center>
      </TouchableOpacity>
    </Box>
  );
}
