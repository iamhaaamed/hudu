import React, {useState} from 'react';
import {
  TextInput,
  Platform,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {FormControl, Text, HStack, Box} from 'native-base';
import {Colors} from '~/styles';
import {useController} from 'react-hook-form';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
      height = verticalScale(45),
      labelFontSize = scale(14),
      fontSize = scale(14),
      autoFocus,
      inputType,
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
      labelFontSize?: number;
      fontSize?: number;
      autoFocus?: boolean;
      inputType?: string | undefined;
    },
    ref: any,
  ) => {
    const {field, fieldState} = useController({name});
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [secureText, setSecureText] = useState<boolean>(true);

    const handleSecurePassword = () => {
      setSecureText(prevState => !prevState);
    };

    const isDirty = formState?.isDirty;

    const borderColor = disabled
      ? Colors.DISABLE
      : fieldState.error
      ? Colors.ERROR
      : !validation
      ? Colors.BORDER
      : isDirty
      ? Colors.SUCCESS
      : Colors.BORDER;

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = (val: any) => {
      setIsFocused(false);
      field.onBlur?.(val);
    };

    return (
      <FormControl isInvalid={fieldState.error} w={{base: '100%'}}>
        <Box mt="3">
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
                disabled
                  ? Colors.DISABLE
                  : field.value || fieldState.error
                  ? Colors.INPUT_LABEL2
                  : Colors.BLACK_1
              }>
              {label ? label : placeholder}
            </Text>
          )}
          <HStack
            h={textArea ? height * 2 : height}
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
              secureTextEntry={inputType === 'password' ? secureText : false}
              placeholderTextColor={
                disabled ? Colors.DISABLE : Colors.PLACEHOLDER2
              }
              style={[
                inputStyle,
                {
                  paddingTop: textArea ? 15 : 0,
                  paddingBottom: textArea ? 15 : 0,
                  fontSize: isFocused ? fontSize - 2 : fontSize,
                  textAlignVertical: textArea ? 'top' : 'center',
                  color: disabled ? Colors.DISABLE : color,
                },
                Platform.OS === 'ios' && {minHeight: 45},
              ]}
            />
            {inputType === 'password' && (
              <TouchableOpacity
                onPress={handleSecurePassword}
                activeOpacity={0.7}>
                <Ionicons
                  name={secureText ? 'eye-off-outline' : 'eye-outline'}
                  color={Colors.BORDER}
                  size={16}
                />
              </TouchableOpacity>
            )}
            {icon && !isFocused && (
              <Ionicons
                name={icon}
                color={disabled ? Colors.DISABLE : Colors.BLACK_3}
                size={16}
              />
            )}
            {rightText && (
              <Text
                fontSize={fontSize}
                fontFamily={fontFamily.regular}
                color={disabled ? Colors.DISABLE : Colors.RIGHT_TEXT}>
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
