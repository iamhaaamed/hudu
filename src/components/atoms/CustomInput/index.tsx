import React from 'react';
import {FormControl, Text, HStack} from 'native-base';
import {Colors} from '~/styles';
import {TextInput, Platform, StyleSheet} from 'react-native';
import {useController} from 'react-hook-form';
import {fontFamily, scale} from '~/utils/style';

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
    },
    ref: any,
  ) => {
    const {field, fieldState} = useController({name});

    return (
      <FormControl isInvalid={fieldState.error} w={{base: '100%'}}>
        {label && (
          <Text
            mb="3"
            color={Colors.BLACK_3}
            fontSize={scale(14)}
            fontFamily={fontFamily.medium}>
            {label}
          </Text>
        )}
        <HStack
          bg={backgroundColor}
          borderRadius="md"
          borderColor={Colors.BORDER_COLOR}
          borderWidth="0.5"
          alignItems="center"
          justifyContent="center"
          px="2">
          <TextInput
            ref={ref}
            numberOfLines={textArea ? 4 : 1}
            textAlignVertical={textArea ? 'top' : 'center'}
            placeholder={placeholder}
            placeholderTextColor={Colors.PLACEHOLDER2}
            autoCapitalize="none"
            keyboardType={keyboardType}
            multiline={textArea ? true : false}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            style={[
              styles.input,
              {
                textAlignVertical: textArea ? 'top' : 'center',
                color: color,
              },
              Platform.OS === 'ios' && {height: 45},
            ]}
          />
        </HStack>
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
