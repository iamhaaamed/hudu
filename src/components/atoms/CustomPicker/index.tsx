import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  useWindowDimensions,
} from 'react-native';
import {
  Icon,
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
    },
    ref: any,
  ) => {
    const DropdownButton = useRef();
    const {height: screenHeight} = useWindowDimensions();
    const {field, fieldState} = useController({name});

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
            top: py + h,
            bottom: undefined,
          });
        } else if (py > maxHeight) {
          setDropdownPosition({
            top: undefined,
            bottom: screenHeight - py + 5 - h / 2,
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
      const item = data.find((element: any) => element.value === value);
      return item?.title;
    };

    const itemOnPress = (item: any) => {
      setVisible(false);
      field.onChange?.(item?.value);
    };

    const renderItem = ({item, index}: {item: any; index: number}) => {
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
                  style={textStyle}
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
              bg={Colors.WHITE}
              color={Colors.BLACK_3}
              style={textStyle}>
              {label}
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
              borderColor={Colors.BLACK_2}>
              <Text
                flex={1}
                numberOfLines={1}
                color={textColor}
                style={textStyle}>
                {field.value ? getName(field.value) : placeholder}
              </Text>
              <Icon
                as={<MaterialCommunityIcons name="chevron-down" />}
                size={scale(22)}
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
              top={dropdownPosition.top}
              bottom={dropdownPosition.bottom}
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
        <FormControl.ErrorMessage>
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
