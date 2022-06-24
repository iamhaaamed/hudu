import React from 'react';
import {Colors} from '~/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {Box, HStack, Text} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {fontFamily, scale} from '~/utils/style';

interface LinkItemProps {
  title: string;
  last?: boolean;
  onPress: () => void;
}
const LinkItem = (props: LinkItemProps) => {
  return (
    <Box mt={props.last ? '6' : '2'}>
      <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
        <HStack alignItems="center" p={2}>
          {props.last && (
            <Icon
              size={24}
              style={styles.icon}
              color={Colors.BLACK_3}
              name="log-out-outline"
            />
          )}
          <Text flex={1} fontSize={scale(16)} fontFamily={fontFamily.regular}>
            {props.title}
          </Text>
          {!props.last && (
            <Icon
              size={scale(16)}
              name="chevron-forward"
              color={Colors.BLACK_3}
            />
          )}
        </HStack>
      </TouchableOpacity>
      {!props.last && (
        <Box borderBottomWidth={0.7} borderColor={Colors.GARY_3} />
      )}
    </Box>
  );
};

export default LinkItem;

const styles = StyleSheet.create({
  icon: {
    marginRight: 8,
    transform: [{rotateY: '180deg'}],
  },
});
