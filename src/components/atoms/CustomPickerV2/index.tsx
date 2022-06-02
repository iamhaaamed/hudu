import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, HStack, Icon, FormControl, Box} from 'native-base';
import {Colors} from '~/styles';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useController} from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';

export default React.forwardRef(
  (
    {
      name,
      data,
      label,
      placeholder,
      height = verticalScale(32),
      textStyle = styles.title,
      textColor = Colors.BLACK_2,
      backgroundColor = Colors.WHITE,
    }: {
      name: any;
      data: any;
      label?: string;
      placeholder?: string;
      height?: number;
      textStyle?: any;
      textColor?: any;
      backgroundColor?: any;
    },
    ref: any,
  ) => {
    const {field, fieldState} = useController({name});

    const itemOnPress = (item: any) => {
      field.onChange?.(item);
    };

    return (
      <FormControl isInvalid={fieldState.error} w={{base: '100%'}}>
        <Box mt={label ? '3' : '0'}>
          {label && (
            <Text
              position="absolute"
              zIndex={400}
              top="-12"
              left="6"
              px="2"
              bg={backgroundColor}
              color={Colors.BLACK_3}
              style={textStyle}>
              {label}
            </Text>
          )}
          <HStack
            borderTopRadius="md"
            borderBottomRadius="md"
            borderWidth="0.7"
            h={height}
            overflow="hidden"
            bg={backgroundColor}
            alignItems="center"
            borderColor={Colors.BLACK_2}>
            <Picker
              dropdownIconColor={backgroundColor}
              dropdownIconRippleColor={backgroundColor}
              style={[
                {
                  color: textColor,
                  backgroundColor,
                },
                styles.picker,
              ]}
              mode="dropdown"
              selectedValue={field.value ? field.value : placeholder}
              onValueChange={item => itemOnPress(item)}>
              {data?.map((item: any, index: number) => {
                return (
                  <Picker.Item
                    key={index + 6}
                    label={item?.title}
                    value={item?.value}
                    style={{
                      color: textColor,
                      backgroundColor,
                      ...textStyle,
                    }}
                  />
                );
              })}
            </Picker>
            <Icon
              as={<MaterialCommunityIcons name="chevron-down" />}
              size={scale(22)}
              color={Colors.BLACK_2}
              position="absolute"
              zIndex={99}
              right="3"
            />
          </HStack>
        </Box>
        <FormControl.ErrorMessage>
          {fieldState.error?.message}
        </FormControl.ErrorMessage>
      </FormControl>
    );
  },
);

const styles = StyleSheet.create({
  title: {
    fontSize: scale(12),
    fontFamily: fontFamily.regular,
  },
  picker: {
    flex: 1,
  },
});
