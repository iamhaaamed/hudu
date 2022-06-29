import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  useWindowDimensions,
} from 'react-native';
import {
  FormControl,
  HStack,
  Box,
  Divider,
  VStack,
  Text,
  FlatList,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '~/styles';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {useController} from 'react-hook-form';

interface dropDownPositionType {
  top: number | undefined;
  bottom: number | undefined;
}

export default React.forwardRef(
  (
    {
      name,
      data,
      label,
      placeholder,
      height = verticalScale(32),
      width,
      right,
      position,
      maxHeight = verticalScale(300),
      textStyle = styles.title,
      textColor = Colors.BLACK_2,
      formState,
      isHorizontal = false,
      validation = false,
      valueKey = 'value',
      titleKey = 'title',
    }: {
      name: any;
      data: any;
      label?: string;
      placeholder?: string;
      height?: number;
      position?:
        | 'absolute'
        | 'relative'
        | '-moz-initial'
        | '-webkit-sticky'
        | 'fixed'
        | 'inherit'
        | 'revert'
        | 'revert-layer'
        | 'static'
        | 'sticky'
        | 'unset';
      width?: number;
      right?: number;
      maxHeight?: number;
      textStyle?: any;
      textColor?: any;
      formState?: any;
      isHorizontal?: boolean;
      validation?: boolean;
      valueKey?: string;
      titleKey?: string;
    },
    ref: any,
  ) => {
    const DropdownButton = useRef();
    const {height: screenHeight} = useWindowDimensions();
    const {field, fieldState} = useController({name});

    const isValid = formState?.isValid;
    const isDirty = formState?.isDirty;

    const [visible, setVisible] = useState(false);
    const [dropdownPosition, setDropdownPosition] =
      useState<dropDownPositionType>({
        top: undefined,
        bottom: undefined,
      });

    const onPressHandler = () => {
      visible ? setVisible(false) : openDropdown();
    };

    const openDropdown = (): void => {
      DropdownButton?.current?.measure((_fx, _fy, _w, h, _px, py) => {
        if (screenHeight - (py + h) > maxHeight) {
          setDropdownPosition({
            top:
              field.value || fieldState.error || isHorizontal
                ? py + h
                : py + h + 12,
            bottom: undefined,
          });
        } else if (py > maxHeight) {
          setDropdownPosition({
            top: undefined,
            bottom:
              field.value || fieldState.error
                ? screenHeight - py + 5 - h / 2
                : screenHeight - py + 5 - h / 2 + 14,
          });
        } else {
          setDropdownPosition({
            top: 0,
            bottom: undefined,
          });
        }
      });
      setVisible(true);
    };

    const getName = (value: string) => {
      const item = data.find((element: any) => element?.[valueKey] === value);
      return item?.[titleKey];
    };

    const itemOnPress = (item: any) => {
      setVisible(false);
      field.onChange?.(item?.[valueKey]);
    };

    const borderColor = fieldState.error
      ? Colors.ERROR
      : !validation
      ? Colors.BORDER_COLOR
      : isDirty
      ? Colors.SUCCESS
      : Colors.BORDER_COLOR;

    const renderItem = ({item, index}: {item: any; index: number}) => {
      const isEnable = item?.[valueKey] === field.value;
      return (
        <Box
          key={index + 1}
          bg={isEnable ? Colors.PRIMARY : Colors.TRANSPARENT}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => itemOnPress(item)}>
            <VStack p="2">
              {item?.[titleKey] && (
                <Text
                  style={textStyle}
                  color={isEnable ? Colors.WHITE : Colors.BLACK_2}>
                  {item?.[titleKey]}
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
    };

    return (
      <FormControl isInvalid={fieldState.error} w={{base: '100%'}}>
        <Box
          mt={
            visible || field.value || fieldState.error || isHorizontal
              ? '3'
              : '0'
          }>
          {(visible || field.value || fieldState.error) && (
            <Text
              position="absolute"
              zIndex={400}
              top="-12"
              left="4"
              pl="2"
              pr="4"
              bg={Colors.WHITE}
              color={
                field.value || fieldState.error || visible
                  ? Colors.INPUT_LABEL2
                  : Colors.BLACK_1
              }
              style={textStyle}>
              {label ? label : placeholder}
            </Text>
          )}
          <TouchableOpacity
            ref={DropdownButton}
            activeOpacity={0.9}
            onPress={onPressHandler}>
            <HStack
              borderRadius="md"
              borderWidth="0.7"
              h={height}
              px="3"
              bg={Colors.WHITE}
              alignItems="center"
              borderColor={borderColor}>
              <Text
                flex={1}
                numberOfLines={1}
                color={textColor}
                style={textStyle}>
                {field.value
                  ? getName(field.value)
                  : !visible
                  ? label
                    ? label
                    : placeholder
                  : placeholder}
              </Text>
              <MaterialCommunityIcons
                name="chevron-down"
                size={22}
                color={Colors.BLACK_2}
              />
            </HStack>
          </TouchableOpacity>
        </Box>
        <Modal visible={visible} transparent animationType="none">
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setVisible(false)}>
            <Box
              top={dropdownPosition?.top}
              bottom={dropdownPosition?.bottom}
              maxHeight={maxHeight}
              position="absolute"
              w="100%">
              <VStack
                bg={Colors.WHITE}
                w={width}
                right={right}
                position={position}
                mx="4"
                borderRadius="md"
                borderColor={Colors.BLACK_2}
                borderWidth="0.7">
                <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={(_, index) => `dropDownItem${index}`}
                  showsVerticalScrollIndicator={false}
                />
              </VStack>
            </Box>
          </TouchableOpacity>
        </Modal>
        <FormControl.ErrorMessage
          fontSize={scale(13)}
          fontFamily={fontFamily.regular}
          mt="0">
          {fieldState?.error?.message}
        </FormControl.ErrorMessage>
      </FormControl>
    );
  },
);

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: scale(12),
    fontFamily: fontFamily.regular,
  },
});
