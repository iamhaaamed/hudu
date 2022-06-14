import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, TextInput} from 'react-native';
import {HStack, VStack, IconButton} from 'native-base';
import {CustomContainer, EmptyData} from '~/components';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import debounce from 'lodash.debounce';
import {SearchProjectItem} from '~/components';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useGetProjects} from '~/hooks/project';

const SearchScreen = ({navigation}: any) => {
  const [userQuery, setUserQuery] = useState('');
  const [searchText, setSearchText] = useState('');
  const [fetchData, setFetchData] = useState([]);

  const options =
    searchText?.length > 0
      ? {
          where: {
            or: [
              {project: {title: {contains: searchText}}},
              {project: {description: {contains: searchText}}},
            ],
          },
        }
      : {};

  const {
    isLoading: getProjectLoading,
    data: getProjects,
    fetchNextPage: fetchNextPageProjects,
    hasNextPage: hasNextPageProjects,
  } = useGetProjects(options);

  const projects = getProjects?.pages ?? [];

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
      setSearchText(query);
      //   searchMutation.mutate(query, {
      //     onSuccess: (data) => {
      //       setFetchData(data);
      //       setPath(data.image_path);
      //     },
      //     onError: () => {},
      //   });
    } else {
      setSearchText(query);
    }
  };

  const closeOnPress = () => {
    navigation.goBack();
  };

  const onLoadMore = () => {
    if (hasNextPageProjects) {
      fetchNextPageProjects();
    }
  };

  const renderItem = ({item}: {item: any}) => (
    <SearchProjectItem {...{item, userQuery: searchText}} />
  );

  const loading = getProjectLoading;

  return (
    <CustomContainer isLoading={loading}>
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
          data={projects}
          renderItem={renderItem}
          keyExtractor={(_, index) => `key${index}`}
          onEndReachedThreshold={0.5}
          onEndReached={({distanceFromEnd}) => {
            if (distanceFromEnd < 0) return;
            onLoadMore?.();
          }}
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
