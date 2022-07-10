import React, {useState} from 'react';
import {StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {VStack, Center} from 'native-base';
import {
  ModalContainer,
  CustomButton,
  RatingStar,
  CustomInput,
  ModalHeader,
} from '~/components';
import {scale} from '~/utils/style';
import {Colors} from '~/styles';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  review: yup.string(),
});

const ReviewModal = ({
  visible,
  onClose,
  onSubmit,
  title,
  loading,
}: {
  visible: boolean;
  onClose: any;
  onSubmit: any;
  title: string;
  loading?: boolean;
}) => {
  const [rate, setRate] = useState(0);

  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const {handleSubmit, register, formState, reset} = methods;

  const onCloseHandler = () => {
    onClose?.();
  };

  const resetForm = () => {
    reset();
    setRate(0);
  };

  const onSubmitHandler = (formData: any) => {
    const input = {
      ...formData,
      rate,
    };
    onSubmit?.(input, resetForm);
  };

  return (
    <ModalContainer
      isVisible={visible}
      onClose={onCloseHandler}
      style={styles.modal}
      loading={loading}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <FormProvider {...methods}>
          <VStack bg={Colors.WHITE} px="2" py="4" space="1" borderRadius="md">
            <ModalHeader text={title} onPress={onCloseHandler} />
            <Center mt="2">
              <RatingStar
                spacing={3}
                size={28}
                rate={rate}
                onChange={setRate}
              />
            </Center>
            <CustomInput
              {...register('review')}
              placeholder="Your feedback"
              backgroundColor={Colors.WHITE}
              textArea
              {...{formState}}
            />
            <CustomButton
              mt="3"
              title="Done"
              onPress={handleSubmit(onSubmitHandler)}
            />
          </VStack>
        </FormProvider>
      </TouchableWithoutFeedback>
    </ModalContainer>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
  modal: {
    borderRadius: 8,
    margin: scale(16),
    overflow: 'hidden',
  },
});
