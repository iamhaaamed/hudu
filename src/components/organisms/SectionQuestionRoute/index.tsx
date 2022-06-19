import React, {forwardRef, useCallback, memo} from 'react';
import {FlatList} from 'react-native';
import {Box, IconButton, VStack} from 'native-base';
import Animated from 'react-native-reanimated';
import * as yup from 'yup';
import {Colors} from '~/styles';
import {CustomInput, QuestionItem} from '~/components';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import {SendIcon} from '~/assets/icons';
import {authStore} from '~/stores';

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
    }: any,
    ref,
  ) => {
    const {isUserLoggedIn} = authStore(state => state);

    const {...methods} = useForm<Record<string, any>, object>({
      resolver: yupResolver<yup.AnyObjectSchema>(schema),
      mode: 'onChange',
    });

    console.log({data});

    const {handleSubmit, register, watch, formState} = methods;

    const sendOnPress = () => {};

    const keyExtractor = useCallback((_, index: number) => `key${index}`, []);

    const renderItem = ({item}: {item: any}) => (
      <QuestionItem {...{item, listerId}} />
    );

    const ItemSeparatorComponent = () => <Box h="4" />;

    const messageText = watch('message');

    return (
      <VStack flex={1} pt={4} pb={6} bg={Colors.WHITE}>
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
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
        {isUserLoggedIn && (
          <VStack px="4" py="4">
            <FormProvider {...methods}>
              <CustomInput
                {...register('message')}
                placeholder="Cannot find your question? Type it here"
                backgroundColor={Colors.WHITE}
                {...{formState}}
                rightComponent={() => (
                  <IconButton
                    onPress={sendOnPress}
                    colorScheme={Colors.WHITE_RIPPLE_COLOR}
                    borderRadius="full"
                    icon={
                      <SendIcon
                        fillColor={
                          messageText?.length > 0
                            ? Colors.PRIMARY
                            : Colors.BLACK_1
                        }
                      />
                    }
                  />
                )}
              />
            </FormProvider>
          </VStack>
        )}
      </VStack>
    );
  },
);

export default memo(SectionQuestionRoute);
