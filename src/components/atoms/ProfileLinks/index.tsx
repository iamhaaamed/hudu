import React, {useState} from 'react';
import {VStack} from 'native-base';
import {Linking} from 'react-native';
import {navigate} from '~/navigation/Methods';
import {authStore, userDataStore} from '~/stores';
import {QuestionModal, LinkItem} from '~/components';
import {useSignOutAuth} from '~/hooks/user';

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
    navLink: null, // TODO : rollback to this string => 'PaymentAccount',
    url: 'https://heyhudu.com',
  },
  {
    id: 8,
    title: 'Support',
    navLink: 'Support',
    url: null,
  },
];

export default function ProfileLinks() {
  const {setIsUserLoggedIn} = authStore(state => state);
  const {setUserData} = userDataStore(state => state);
  const {signOut} = useSignOutAuth();

  const [loading, setLoading] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const onItemPressHandler = (item: any) => {
    item.url
      ? Linking.openURL(item.url)
      : // @ts-ignore
        navigate('AuthStack', {
          screen: item.navLink,
        });
  };

  const onLogOutPressHandler = () => {
    setLogoutModalVisible(true);
  };

  const onCloseLogoutModal = () => {
    setLogoutModalVisible(false);
  };

  const onAcceptLogoutModal = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
    setLogoutModalVisible(false);
    setIsUserLoggedIn(false);
    setUserData({});
  };

  return (
    <>
      <VStack mt={5}>
        {LINKS.map(item => (
          <LinkItem
            key={item.id}
            title={item.title}
            onPress={() => onItemPressHandler(item)}
          />
        ))}
        <LinkItem last title="Log out" onPress={onLogOutPressHandler} />
      </VStack>
      <QuestionModal
        option1="Cancel"
        option2="Log out"
        loading={loading}
        visible={logoutModalVisible}
        onClose={onCloseLogoutModal}
        option1OnPress={onCloseLogoutModal}
        option2OnPress={onAcceptLogoutModal}
        title="Are you sure you want log out?"
      />
    </>
  );
}
