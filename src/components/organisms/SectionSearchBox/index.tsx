import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {
  HStack,
  VStack,
  Icon,
  ScrollView,
  Box,
  Divider,
  Text,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import debounce from 'lodash.debounce';
import images from '~/assets/images';
import {CustomImage} from '~/components';

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

const SectionSearchBox = ({
  maxHeight = verticalScale(300),
}: {
  maxHeight?: number;
}) => {
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

  const getHighlightedText = (text: any, highlight: any) => {
    const parts = text?.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <Text fontFamily={fontFamily.regular} fontSize={scale(14)}>
        {' '}
        {parts.map((part: any, i: number) => (
          <Text
            key={i}
            color={
              part.toLowerCase() === highlight?.toLowerCase()
                ? Colors.BLACK_3
                : Colors.PLACEHOLDER
            }>
            {part}
          </Text>
        ))}{' '}
      </Text>
    );
  };

  const itemOnPress = (item: any) => {};

  return (
    <VStack px="4">
      <HStack
        alignItems="center"
        borderWidth="1"
        borderColor={Colors.BLACK_3}
        borderTopRadius="md"
        borderBottomRadius={fetchData?.length > 0 ? '0' : 'md'}
        h={verticalScale(40)}
        px="2"
        bg={Colors.SEARCH_BACKGROUND}>
        <Icon
          as={<MaterialCommunityIcons name="magnify" />}
          size={scale(24)}
          color={Colors.BLACK_1}
        />
        <TextInput
          value={userQuery}
          onChangeText={onChange}
          placeholder="Search project"
          placeholderTextColor={Colors.BLACK_3}
          style={styles.input}
        />
      </HStack>
      {fetchData?.length > 0 && (
        <VStack
          position="absolute"
          zIndex={20}
          bg={Colors.WHITE}
          alignSelf="center"
          w="100%"
          mt={verticalScale(40)}
          maxHeight={maxHeight}
          borderBottomRadius="md"
          borderColor={Colors.BLACK_2}
          borderWidth="0.7">
          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
            {fetchData?.map((item: any, index: number) => {
              return (
                <Box key={index + 1} px="3">
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => itemOnPress(item)}>
                    <HStack py="1" px="3" space="3" alignItems="center">
                      <CustomImage
                        local
                        imageSource={item?.image}
                        style={styles.image}
                        resizeMode="stretch"
                      />
                      {item?.title &&
                        getHighlightedText(item?.title, userQuery)}
                    </HStack>
                  </TouchableOpacity>
                  {index + 1 < fetchData?.length && <Divider />}
                </Box>
              );
            })}
          </ScrollView>
        </VStack>
      )}
    </VStack>
  );
};

export default SectionSearchBox;

const styles = StyleSheet.create({
  input: {
    fontFamily: fontFamily.regular,
    fontSize: scale(11),
    color: Colors.BLACK_3,
    flex: 1,
  },
  image: {
    width: scale(38),
    height: verticalScale(24),
    borderRadius: 8,
  },
});
