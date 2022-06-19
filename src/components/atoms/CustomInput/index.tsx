import React, {useState} from 'react';
import {Colors} from '~/styles';
import {useController} from 'react-hook-form';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInput, Platform, StyleSheet, TextStyle} from 'react-native';
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
      rightComponent,
      formState,
      validation = false,
      isHorizontal = false,
      height = verticalScale(45),
      labelFontSize = scale(14),
      fontSize = scale(14),
      autoFocus,
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
      rightComponent?: any;
      formState?: any;
      validation?: boolean;
      height?: number;
      isHorizontal?: boolean;
      labelFontSize?: number;
      fontSize?: number;
      autoFocus?: boolean;
    },
    ref: any,
  ) => {
    const {field, fieldState} = useController({name});
    const [isFocused, setIsFocused] = useState(false);

    const isValid = formState?.isValid;
    const isDirty = formState?.isDirty;

    const borderColor = disabled
      ? Colors.DISABLE_COLOR
      : fieldState.error
      ? Colors.ERROR
      : !validation
      ? Colors.BORDER_COLOR
      : isDirty
      ? Colors.SUCCESS
      : Colors.BORDER_COLOR;

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = (val: any) => {
      setIsFocused(false);
      field.onBlur?.(val);
    };

    return (
      <FormControl isInvalid={fieldState.error} w={{base: '100%'}}>
        <Box
          mt={
            isFocused || field.value || fieldState.error || isHorizontal
              ? '3'
              : '0'
          }>
          {(isFocused || field.value || fieldState.error || disabled) && (
            <Text
              pl="2"
              pr="4"
              left="4"
              top="-12"
              zIndex={60}
              bg={Colors.WHITE}
              position="absolute"
              fontSize={labelFontSize}
              fontFamily={fontFamily.regular}
              color={
                field.value || fieldState.error || disabled
                  ? Colors.INPUT_LABEL2
                  : Colors.BLACK_1
              }>
              {label ? label : placeholder}
            </Text>
          )}
          <HStack
            h={textArea ? undefined : height}
            px="2"
            borderWidth="0.7"
            borderRadius="md"
            alignItems="center"
            bg={backgroundColor}
            justifyContent="center"
            borderColor={borderColor}>
            <TextInput
              autoFocus={autoFocus}
              ref={ref}
              value={field.value}
              onFocus={handleFocus}
              onBlur={handleBlur}
              editable={!disabled}
              autoCapitalize="none"
              placeholder={
                !isFocused ? (label ? label : placeholder) : placeholder
              }
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
                  paddingTop: textArea ? 15 : 0,
                  paddingBottom: textArea ? 15 : 0,
                  fontSize: isFocused ? fontSize - 2 : fontSize,
                  textAlignVertical: textArea ? 'top' : 'center',
                  color: color,
                },
                Platform.OS === 'ios' && {minHeight: 45},
              ]}
            />
            {icon && !isFocused && (
              <Icon
                size={scale(16)}
                as={<Ionicons name={icon} />}
                color={disabled ? Colors.DISABLE_COLOR : Colors.BLACK_3}
              />
            )}
            {rightText && (
              <Text
                fontSize={fontSize}
                fontFamily={fontFamily.regular}
                color={disabled ? Colors.DISABLE_COLOR : Colors.RIGHT_TEXT}>
                {rightText}
              </Text>
            )}
            {rightComponent && rightComponent()}
          </HStack>
        </Box>
        <FormControl.ErrorMessage
          fontSize={scale(13)}
          fontFamily={fontFamily.regular}
          mt="0">
          {fieldState.error?.message}
        </FormControl.ErrorMessage>
      </FormControl>
    );
  },
);

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontFamily: fontFamily.regular,
    height: '100%',
  },
});
