import React from 'react';
import {Colors} from '~/styles';
import {useController} from 'react-hook-form';
import {fontFamily, scale} from '~/utils/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  TextInput,
  Platform,
  StyleSheet,
  TextInputProps,
  TextStyle,
} from 'react-native';
import {FormControl, Text, HStack, Box, Icon} from 'native-base';

export default React.forwardRef(
  (
    {
      name,
      placeholder,
      keyboardType,
      backgroundColor = 'transparent',
      label,
      color = Colors.INPUT,
      textArea = false,
      inputStyle = styles.input,
      icon,
      rightText,
      disabled,
    }: {
      name: any;
      placeholder?: string;
      keyboardType?:
        | 'default'
        | 'email-address'
        | 'numeric'
        | 'phone-pad'
        | 'number-pad'
        | 'decimal-pad'
        | 'visible-password'
        | 'ascii-capable'
        | 'numbers-and-punctuation'
        | 'url'
        | 'name-phone-pad'
        | 'twitter'
        | 'web-search'
        | undefined;
      backgroundColor?: string;
      label?: string;
      color?: string;
      textArea?: boolean;
      inputStyle?: TextStyle;
      icon?: any;
      rightText?: string;
      disabled?: boolean;
    },
    ref: any,
  ) => {
    const {field, fieldState} = useController({name});

    return (
      <FormControl isInvalid={fieldState.error} w={{base: '100%'}}>
        <Box mt={label ? '3' : '0'}>
          {label && (
            <Text
              px="2"
              left="6"
              top="-12"
              zIndex={60}
              bg={Colors.WHITE}
              position="absolute"
              fontSize={scale(14)}
              fontFamily={fontFamily.medium}
              color={disabled ? Colors.DISABLE_COLOR : Colors.BLACK_3}>
              {label}
            </Text>
          )}
          <HStack
            px="2"
            borderWidth="0.5"
            borderRadius="md"
            alignItems="center"
            bg={backgroundColor}
            justifyContent="center"
            borderColor={disabled ? Colors.DISABLE_COLOR : Colors.BORDER_COLOR}>
            <TextInput
              ref={ref}
              value={field.value}
              onBlur={field.onBlur}
              editable={!disabled}
              autoCapitalize="none"
              placeholder={placeholder}
              keyboardType={keyboardType}
              onChangeText={field.onChange}
              numberOfLines={textArea ? 4 : 1}
              multiline={textArea ? true : false}
              textAlignVertical={textArea ? 'top' : 'center'}
              placeholderTextColor={
                disabled ? Colors.DISABLE_COLOR : Colors.PLACEHOLDER2
              }
              style={[
                inputStyle,
                {
                  textAlignVertical: textArea ? 'top' : 'center',
                  color: color,
                },
                Platform.OS === 'ios' && {minHeight: 45},
              ]}
            />
            {icon && (
              <Icon
                size={scale(16)}
                as={<Ionicons name={icon} />}
                color={disabled ? Colors.DISABLE_COLOR : Colors.BLACK_3}
              />
            )}
            {rightText && (
              <Text
                fontSize={scale(14)}
                fontFamily={fontFamily.regular}
                color={disabled ? Colors.DISABLE_COLOR : Colors.RIGHT_TEXT}>
                {rightText}
              </Text>
            )}
          </HStack>
        </Box>
        <FormControl.ErrorMessage fontFamily={fontFamily.medium}>
          {fieldState.error?.message}
        </FormControl.ErrorMessage>
      </FormControl>
    );
  },
);

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: scale(14),
    fontFamily: fontFamily.regular,
  },
});
