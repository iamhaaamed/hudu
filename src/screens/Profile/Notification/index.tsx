import React from 'react';
import {Colors} from '~/styles';
import {CustomContainer} from '~/components';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text, Badge, HStack, FlatList, IconButton} from 'native-base';

export default function NotificationScreen() {
  return (
    <CustomContainer>
      <FlatList
        py={5}
        data={Array(10).fill(0)}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}: any) => (
          <NotificationItem unRead={index % 3 == 0} />
        )}
      />
    </CustomContainer>
  );
}

interface ItemType {
  unRead: boolean;
}
function NotificationItem(props: ItemType) {
  return (
    <HStack
      pl={3}
      mb={3}
      width="90%"
      rounded={10}
      borderWidth={1}
      overflow="hidden"
      alignSelf="center"
      alignItems="center"
      borderColor={Colors.GARY_2}>
      {props.unRead && (
        <Badge
          px={1}
          mr={2}
          width={3}
          height={3}
          rounded="full"
          variant="solid"
          colorScheme="warning"
        />
      )}
      <Text flex={1}>Notification text</Text>
      <IconButton
        rounded="full"
        onPress={() => {}}
        colorScheme={Colors.RED_RIPPLE_COLOR}
        icon={<Icon name="close" color="#000" size={24} />}
      />
    </HStack>
  );
}
