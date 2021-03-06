import React from 'react';
import {VStack} from 'native-base';
import {Linking} from 'react-native';
import {navigate} from '~/navigation/Methods';
import {LinkItem, CustomIconButton} from '~/components';

const LINKS = [
  {
    id: 1,
    title: 'Terms and conditions',
    navLink: null,
    url: 'https://heyhudu.com/terms-and-conditions',
  },
  {
    id: 2,
    title: 'FAQ',
    navLink: null,
    url: 'https://heyhudu.com/faq',
  },
  {
    id: 3,
    title: 'Privacy policy',
    navLink: null,
    url: 'https://heyhudu.com/privacy',
  },
  {
    id: 4,
    title: 'Manage payment account',
    navLink: null, // TODO : rollback to this string => 'PaymentAccount',
    url: 'https://heyhudu.com',
  },
  {
    id: 5,
    title: 'Support',
    navLink: 'Support',
    url: null,
  },
];

const AuthProfileLinks = () => {
  const onItemPressHandler = (item: any) => {
    item.url
      ? Linking.openURL(item.url)
      : navigate('AuthStack', {
          screen: item.navLink,
        });
  };

  const onLogOutPressHandler = () => {
    navigate('AuthStack');
  };

  return (
    <>
      <VStack mt="5" mb="9">
        {LINKS.map(item => (
          <LinkItem
            key={item.id}
            title={item.title}
            onPress={() => onItemPressHandler(item)}
          />
        ))}
      </VStack>
      <CustomIconButton
        name="log-out-outline"
        title="Log in"
        onPress={onLogOutPressHandler}
      />
    </>
  );
};

export default AuthProfileLinks;
