import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Box, HStack, Spinner, Text, VStack} from 'native-base';
import {Colors} from '~/styles';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {authStore, userDataStore} from '~/stores';
import {SendIcon} from '~/assets/icons';
import {useAddQuestion} from '~/hooks/project';
import {ResponseStatus} from '~/generated/graphql';
import {QuestionChildItem} from '~/components';

const QuestionItem = ({item, listerId}: {item: any; listerId: number}) => {
  const {isUserLoggedIn} = authStore(state => state);
  const {userData} = userDataStore(state => state);

  const currentUser = userData?.id === item?.userId;
  const isLister = listerId === item?.userId;
  const currentUserIsLister = listerId === userData?.id;
  const [replyText, setReplyText] = useState('');
  const {mutate: mutateAddQuestion, isLoading: addQuestionLoading} =
    useAddQuestion();

  const sendOnPress = () => {
    if (replyText?.length > 0) {
      const input = {
        text: replyText,
        projectId: item?.projectId,
        parentId: item?.id,
      };
      mutateAddQuestion(input, {
        onSuccess: successData => {
          if (
            successData?.project_addQuestion?.status === ResponseStatus.Success
          ) {
            setReplyText('');
          }
        },
      });
    }
  };

  return (
    <VStack space="2">
      <HStack space="4" px="4">
        <Text
          numberOfLines={1}
          flex={0.25}
          fontSize={scale(14)}
          fontFamily={fontFamily.medium}
          color={Colors.BLACK_1}>
          {currentUser
            ? 'you'
            : isLister
            ? 'Lister'
            : item?.user?.userName ?? 'user'}
          :
        </Text>
        <Text
          flex={0.75}
          fontSize={scale(14)}
          fontFamily={fontFamily.regular}
          color={Colors.PLACEHOLDER2}>
          {item?.text}
        </Text>
      </HStack>
      {isUserLoggedIn &&
        item?.childrenQuestions?.length < 1 &&
        currentUserIsLister &&
        !isLister && (
          <HStack space="4">
            <Box flex={0.2} />
            <HStack
              h={verticalScale(40)}
              space="1"
              flex={0.7}
              alignItems="center"
              borderBottomColor={Colors.PLACEHOLDER2}
              borderBottomWidth="1">
              <TextInput
                value={replyText}
                autoCapitalize="none"
                placeholder="Reply to HUDUr"
                onChangeText={setReplyText}
                multiline={false}
                placeholderTextColor={Colors.PLACEHOLDER2}
                style={styles.input}
              />
              {replyText?.length > 0 && (
                <TouchableOpacity activeOpacity={0.7} onPress={sendOnPress}>
                  <Box>
                    {addQuestionLoading ? (
                      <Spinner size={24} color={Colors.PRIMARY} />
                    ) : (
                      <SendIcon
                        height={24}
                        width={24}
                        fillColor={Colors.PRIMARY}
                      />
                    )}
                  </Box>
                </TouchableOpacity>
              )}
            </HStack>
            <Box flex={0.15} />
          </HStack>
        )}
      {item?.childrenQuestions?.map((element: any, indx: number) => (
        <QuestionChildItem key={indx} {...{item: element, listerId}} />
      ))}
    </VStack>
  );
};

export default QuestionItem;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: '100%',
    textAlignVertical: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    fontFamily: fontFamily.regular,
    fontSize: scale(12),
    color: Colors.PLACEHOLDER,
  },
});
