import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Box, HStack, IconButton, Spinner, Text, VStack} from 'native-base';
import {Colors} from '~/styles';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {userDataStore} from '~/stores';
import {SendIcon} from '~/assets/icons';
import {useAddQuestion} from '~/hooks/project';
import {ResponseStatus} from '~/generated/graphql';
import {QuestionChildItem} from '~/components';

const QuestionItem = ({item, listerId}: {item: any; listerId: number}) => {
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
        onSuccess: (successData: any) => {
          if (
            successData?.project_addQuestion?.status === ResponseStatus.Success
          ) {
            setReplyText('');
          }
        },
        onError: () => {},
      });
    }
  };

  return (
    <VStack space="2">
      <HStack space="4" px="4">
        <Text
          numberOfLines={1}
          flex={0.15}
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
          flex={0.85}
          fontSize={scale(14)}
          fontFamily={fontFamily.regular}
          color={Colors.PLACEHOLDER}>
          {item?.text}
        </Text>
      </HStack>
      {item?.childrenQuestions?.length < 1 && currentUserIsLister && !isLister && (
        <HStack space="4">
          <Box flex={0.2} />
          <HStack
            space="1"
            flex={0.7}
            alignItems="center"
            borderBottomColor={Colors.PLACEHOLDER}
            borderBottomWidth="1">
            <TextInput
              value={replyText}
              autoCapitalize="none"
              placeholder="Reply to HUDUr"
              onChangeText={setReplyText}
              multiline={false}
              placeholderTextColor={Colors.PLACEHOLDER}
              style={styles.input}
            />
            {replyText?.length > 0 && (
              <IconButton
                onPress={sendOnPress}
                colorScheme={Colors.WHITE_RIPPLE_COLOR}
                borderRadius="full"
                icon={
                  addQuestionLoading ? (
                    <Spinner size={12} color={Colors.PRIMARY} />
                  ) : (
                    <SendIcon
                      height={12}
                      width={12}
                      fillColor={Colors.PRIMARY}
                    />
                  )
                }
              />
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
    height: verticalScale(30),
    textAlignVertical: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    fontFamily: fontFamily.regular,
    fontSize: scale(10),
    color: Colors.PLACEHOLDER,
  },
});
