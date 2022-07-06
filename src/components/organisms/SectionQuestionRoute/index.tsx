import React, {forwardRef, useCallback, memo, useEffect} from 'react';
import {FlatList, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Box, IconButton, VStack, Spinner} from 'native-base';
import Animated from 'react-native-reanimated';
import * as yup from 'yup';
import {Colors} from '~/styles';
import {
  CustomInput,
  QuestionItem,
  CustomLoading,
  EmptyData,
} from '~/components';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import {SendIcon} from '~/assets/icons';
import {authStore, userDataStore} from '~/stores';
import {useAddQuestion} from '~/hooks/project';
import {ResponseStatus} from '~/generated/graphql';
import {scale} from '~/utils/style';

const schema = yup.object().shape({
  message: yup.string(),
});

export const AnimatedFlatList: typeof FlatList =
  Animated.createAnimatedComponent(FlatList);

const SectionQuestionRoute = forwardRef(
  (
    {
      data,
      listerId,
      contentContainerStyle,
      onMomentumScrollEnd,
      onScrollEndDrag,
      scrollEventThrottle,
      scrollIndicatorInsets,
      onScroll,
      projectId,
      isRefetching,
    }: any,
    ref,
  ) => {
    const {isUserLoggedIn} = authStore(state => state);
    const {userData} = userDataStore(state => state);

    const {mutate: mutateAddQuestion, isLoading: addQuestionLoading} =
      useAddQuestion();

    const {...methods} = useForm<Record<string, any>, object>({
      resolver: yupResolver<yup.AnyObjectSchema>(schema),
      mode: 'onChange',
    });

    const {handleSubmit, register, watch, formState, setValue} = methods;

    const sendOnPress = (formData: any) => {
      if (formData?.message?.length > 0) {
        const input = {
          text: formData?.message,
          projectId,
          parentId: null,
        };
        mutateAddQuestion(input, {
          onSuccess: successData => {
            if (
              successData?.project_addQuestion?.status ===
              ResponseStatus.Success
            ) {
              setValue('message', '');
            }
          },
          onError: () => {},
        });
      }
    };

    const keyExtractor = useCallback((_, index: number) => `key${index}`, []);

    const renderItem = ({item}: {item: any}) => (
      <QuestionItem {...{item, listerId}} />
    );

    const ItemSeparatorComponent = () => <Box h="4" />;

    const messageText = watch('message');

    const loading = false;

    useEffect(() => {
      ref.current.scrollToEnd({animated: true});
    }, [isRefetching]);

    return (
      <VStack flex={1} pt={4} pb={6} bg={Colors.WHITE}>
        {loading && <CustomLoading />}
        <AnimatedFlatList
          ref={ref}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          {...{
            data,
            onScroll,
            contentContainerStyle,
            onMomentumScrollEnd,
            onScrollEndDrag,
            scrollEventThrottle,
            scrollIndicatorInsets,
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <EmptyData flex={0.1} text="No questions" />
          )}
          ItemSeparatorComponent={ItemSeparatorComponent}
          onLayout={() => ref.current.scrollToEnd({animated: true})}
        />
        {isUserLoggedIn && userData?.id !== listerId && (
          <Box position="absolute" bottom="0" w="100%">
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <VStack px="4" py="4">
                <FormProvider {...methods}>
                  <CustomInput
                    {...register('message')}
                    placeholder="Cannot find your question? Type it here"
                    backgroundColor={Colors.WHITE}
                    {...{formState}}
                    rightComponent={() => (
                      <IconButton
                        disabled={addQuestionLoading}
                        onPress={handleSubmit(sendOnPress)}
                        colorScheme={Colors.WHITE_RIPPLE_COLOR}
                        borderRadius="full"
                        icon={
                          addQuestionLoading ? (
                            <Spinner size={scale(13)} color={Colors.PRIMARY} />
                          ) : (
                            <SendIcon
                              fillColor={
                                messageText?.length > 0
                                  ? Colors.PRIMARY
                                  : Colors.BLACK_1
                              }
                            />
                          )
                        }
                      />
                    )}
                  />
                </FormProvider>
              </VStack>
            </TouchableWithoutFeedback>
          </Box>
        )}
      </VStack>
    );
  },
);

export default memo(SectionQuestionRoute);
