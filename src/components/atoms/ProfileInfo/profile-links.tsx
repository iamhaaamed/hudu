import React from 'react';
import {Colors} from '~/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {Box, HStack, Text, VStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {Linking, StyleSheet, TouchableOpacity} from 'react-native';

const LINKS = [
  {
    id: 1,
    title: 'Edit Profile',
    navLink: 'EditProfile',
    url: null,
  },
  {
    id: 2,
    title: 'Notification',
    navLink: 'Notification',
    url: null,
  },
  {
    id: 3,
    title: 'Reviews',
    navLink: 'Reviews',
    url: null,
  },
  {
    id: 4,
    title: 'Terms and conditions',
    navLink: null,
    url: 'https://heyhudu.com/terms-and-conditions',
  },
  {
    id: 5,
    title: 'FAQ',
    navLink: null,
    url: 'https://heyhudu.com/faq',
  },
  {
    id: 6,
    title: 'Privacy policy',
    navLink: null,
    url: 'https://heyhudu.com/privacy',
  },
  {
    id: 7,
    title: 'Manage payment account',
    navLink: 'PaymentAccount',
    url: null,
  },
  {
    id: 8,
    title: 'Support',
    navLink: 'Support',
    url: null,
  },
];

export default function ProfileLinks() {
  const {navigate} = useNavigation();

  const onItemPressHandler = (item: any) => {
    item.url ? Linking.openURL(item.url) : navigate(item.navLink);
  };

  const onLogOutPressHandler = () => navigate('Auth');

  return (
    <VStack mt={5}>
      {LINKS.map(item => (
        <LinkItem
          key={item.id}
          title={item.title}
          onPress={onItemPressHandler.bind(null, item)}
        />
      ))}
      <LinkItem last title="Log out" onPress={onLogOutPressHandler} />
    </VStack>
  );
}

interface LinkItemProps {
  title: string;
  last?: boolean;
  onPress: () => void;
}
function LinkItem(props: LinkItemProps) {
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
          <Text flex={1} fontSize={16}>
            {props.title}
          </Text>
          {!props.last && (
            <Icon size={16} name="chevron-forward" color={Colors.BLACK_3} />
          )}
        </HStack>
      </TouchableOpacity>
      {!props.last && (
        <Box borderBottomWidth={0.7} borderColor={Colors.GARY_3} />
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 8,
    transform: [{rotateY: '180deg'}],
  },
});
