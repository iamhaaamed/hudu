import React, {useState} from 'react';
import {TouchableOpacity, LayoutAnimation} from 'react-native';
import {
  VStack,
  Text,
  Box,
  HStack,
  Divider,
  Icon,
  FormControl,
  ScrollView,
} from 'native-base';
import {Colors} from '~/styles';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useController} from 'react-hook-form';

export default React.forwardRef(
  (
    {
      name,
      data,
      label,
      required,
      placeholder,
      height = verticalScale(32),
      maxHeight = verticalScale(300),
    }: {
      name: any;
      data: any;
      label?: string;
      required?: boolean;
      placeholder?: string;
      height?: number;
      maxHeight?: number;
    },
    ref: any,
  ) => {
    const {field, fieldState} = useController({name});
    const [visible, setVisible] = useState(false);

    const onPressHandler = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setVisible(prevState => !prevState);
    };

    const getName = (value: string) => {
      const item = data.find((element: any) => element.value === value);
      return item?.title;
    };

    const itemOnPress = (item: any) => {
      setVisible(false);
      field.onChange?.(item?.value);
    };

    return (
      <FormControl isInvalid={fieldState.error} w={{base: '100%'}}>
        {label && (
          <Text
            mb="3"
            ref={ref}
            color={Colors.LABEL_COLOR}
            fontSize={scale(14)}
            fontFamily={fontFamily.regular}>
            {label}
            {required && <Text color={Colors.PRIMARY}>{'   *'}</Text>}
          </Text>
        )}
        <TouchableOpacity activeOpacity={0.9} onPress={onPressHandler}>
          <HStack
            borderTopRadius="md"
            borderBottomRadius={visible ? '0' : 'md'}
            borderWidth="0.7"
            h={height}
            px="2"
            bg={Colors.WHITE}
            alignItems="center"
            borderColor={Colors.BLACK_2}>
            <Text
              flex={1}
              numberOfLines={1}
              fontSize={scale(12)}
              fontFamily={fontFamily.regular}
              color={Colors.BLACK_2}>
              {field.value ? getName(field.value) : placeholder}
            </Text>
            <Icon
              as={<MaterialCommunityIcons name="chevron-down" />}
              size={scale(22)}
              color={Colors.BLACK_2}
            />
          </HStack>
        </TouchableOpacity>
        {visible && (
          <VStack
            position="absolute"
            zIndex={20}
            bg={Colors.WHITE}
            w="100%"
            mt={height}
            maxHeight={maxHeight}
            borderBottomRadius="md"
            borderColor={Colors.BLACK_2}
            borderWidth="0.7">
            <ScrollView
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}>
              {data.map((item: any, index: number) => {
                const isEnable = item?.value === field.value;
                return (
                  <Box
                    key={index + 1}
                    bg={isEnable ? Colors.PRIMARY : Colors.TRANSPARENT}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => itemOnPress(item)}>
                      <VStack p="2">
                        {item?.title && (
                          <Text
                            fontSize={scale(12)}
                            fontFamily={fontFamily.regular}
                            color={isEnable ? Colors.WHITE : Colors.BLACK_2}>
                            {item?.title}
                          </Text>
                        )}
                        {item?.subtitle && (
                          <Text
                            fontSize={scale(10)}
                            fontFamily={fontFamily.regular}
                            color={Colors.BLACK_2}>
                            {item?.subtitle}
                          </Text>
                        )}
                      </VStack>
                    </TouchableOpacity>
                    {index + 1 < data?.length && <Divider />}
                  </Box>
                );
              })}
            </ScrollView>
          </VStack>
        )}
        <FormControl.ErrorMessage>
          {fieldState.error?.message}
        </FormControl.ErrorMessage>
      </FormControl>
    );
  },
);
