import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, TextInput} from 'react-native';
import {HStack, VStack, IconButton} from 'native-base';
import {CustomContainer, EmptyData} from '~/components';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import debounce from 'lodash.debounce';
import images from '~/assets/images';
import {SearchProjectItem} from '~/components';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const projects = [
  {
    id: 0,
    timeLeft: '3 Days',
    title: 'Project 1',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
    lowBid: 190,
    image: images.testImage1,
  },
  {
    id: 1,
    timeLeft: '3 Days',
    title: 'Project 2',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
    image: images.testImage1,
  },
  {
    id: 2,
    timeLeft: '3 Days',
    title: 'Project 3',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
    lowBid: 190,
    image: images.testImage1,
  },
];

const SearchScreen = ({navigation}: any) => {
  const [userQuery, setUserQuery] = useState('');
  const [fetchData, setFetchData] = useState([]);

  const delayedQuery = debounce(() => updateQuery(), 500);

  useEffect(() => {
    delayedQuery();
    return delayedQuery.cancel;
  }, [userQuery]);

  const onChange = (text: any) => {
    setUserQuery(text);
  };

  const updateQuery = () => {
    sendQuery(userQuery);
  };

  const sendQuery = async (query: any) => {
    if (query.length > 0) {
      const newData = projects.filter((item: any) => {
        const itemData = `${(item.title || '').toUpperCase()}`;
        const textData = userQuery.toUpperCase();
        const t = itemData.indexOf(textData) > -1;
        return t;
      });
      setFetchData(newData);
      //   searchMutation.mutate(query, {
      //     onSuccess: (data) => {
      //       setFetchData(data);
      //       setPath(data.image_path);
      //     },
      //     onError: () => {},
      //   });
    } else {
      setFetchData([]);
    }
  };

  const closeOnPress = () => {
    navigation.goBack();
  };

  const renderItem = ({item}: {item: any}) => (
    <SearchProjectItem {...{item, userQuery}} />
  );

  return (
    <CustomContainer>
      <VStack space="4" py="4" flex={1}>
        <HStack
          alignItems="center"
          borderWidth="1"
          borderColor={Colors.BLACK_3}
          borderRadius="xl"
          h={verticalScale(40)}
          mx="4"
          px="2"
          bg={Colors.SEARCH_BACKGROUND}>
          <TextInput
            value={userQuery}
            onChangeText={onChange}
            placeholder="Search project"
            placeholderTextColor={Colors.BLACK_3}
            style={styles.input}
            autoFocus
          />
          {userQuery?.length > 0 && (
            <IconButton
              onPress={closeOnPress}
              bg={Colors.WHITE_RIPPLE_COLOR}
              colorScheme={Colors.WHITE_RIPPLE_COLOR}
              borderRadius="full"
              icon={<EvilIcons name="close" color={Colors.BLACK_3} size={18} />}
            />
          )}
        </HStack>
        <FlatList
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapperStyle}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={EmptyData}
          numColumns={2}
          data={fetchData}
          renderItem={renderItem}
          keyExtractor={(_, index) => `key${index}`}
        />
      </VStack>
    </CustomContainer>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  columnWrapperStyle: {
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  input: {
    fontFamily: fontFamily.regular,
    fontSize: scale(14),
    color: Colors.BLACK_3,
    flex: 1,
    height: '100%',
    paddingTop: 0,
    paddingBottom: 0,
  },
});
