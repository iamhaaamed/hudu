import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {HStack, Box, Text} from 'native-base';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import {navigate} from '~/navigation/Methods';
import {SearchIcon} from '~/assets/icons';

const SectionSearchBox = () => {
  const onPressHandler = () => {
    navigate('Search');
  };

  return (
    <Box
      mx="4"
      borderWidth="0.7"
      borderColor={Colors.BLACK_3}
      borderRadius="xl"
      h={verticalScale(40)}
      bg={Colors.SEARCH_BACKGROUND}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressHandler}
        style={styles.touchable}>
        <HStack borderRadius="xl" flex={1} alignItems="center" px="2" space="2">
          <SearchIcon />
          <Text
            fontSize={scale(12)}
            fontFamily={fontFamily.regular}
            color={Colors.BLACK_1}>
            Search projects
          </Text>
        </HStack>
      </TouchableOpacity>
    </Box>
  );
};

export default SectionSearchBox;

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
    flex: 1,
  },
});
