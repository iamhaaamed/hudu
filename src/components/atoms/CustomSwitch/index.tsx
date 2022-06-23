import React from 'react';
import {Colors} from '~/styles';
import {useController} from 'react-hook-form';
import {fontFamily, scale} from '~/utils/style';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {FormControl, Text, HStack, Box, Center} from 'native-base';

export default React.forwardRef(
  (
    {
      name,
      data,
    }: {
      name: any;
      data?: any;
    },
    ref: any,
  ) => {
    const {field, fieldState} = useController({name});

    const onPressHandler = (item: any) => {
      field.onChange(item?.value);
    };

    return (
      <FormControl isInvalid={fieldState.error} w={{base: '100%'}}>
        <Box>
          <HStack
            p="2"
            space="2"
            alignItems="center"
            justifyContent="space-between">
            {data?.map((item: any, index: number) => {
              const isActive = field.value === item?.value;
              return (
                <TouchableOpacity
                  key={index + 1}
                  onPress={() => onPressHandler(item)}
                  activeOpacity={0.7}
                  style={styles.item}>
                  <HStack alignItems="center" space="1">
                    <Center
                      borderRadius="full"
                      size="8"
                      p="0.5"
                      overflow="hidden"
                      borderWidth="0.5"
                      borderColor={Colors.BLACK_1}
                      bg={Colors.WHITE}>
                      <Center
                        size="full"
                        borderRadius="full"
                        bg={isActive ? Colors.PRIMARY : Colors.WHITE}
                      />
                    </Center>
                    <Text
                      fontSize={scale(14)}
                      fontFamily={fontFamily.regular}
                      color={Colors.BLACK_2}>
                      {item?.title}
                    </Text>
                  </HStack>
                </TouchableOpacity>
              );
            })}
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
  item: {
    flex: 1,
  },
});
