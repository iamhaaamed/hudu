import React, {useEffect} from 'react';
import {StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {VStack} from 'native-base';
import {
  ModalContainer,
  CustomButton,
  CustomInput,
  ModalHeader,
} from '~/components';
import {fontFamily, scale} from '~/utils/style';
import {Colors} from '~/styles';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  amount: yup
    .number()
    .typeError('you must specify a number')
    .required('required')
    .nullable(),
  description: yup.string().required('required').nullable(),
});

const EditModal = ({
  visible,
  onClose,
  onSubmit,
  title,
  loading,
  defaultData,
  buttonTitle = 'Submit bid',
}: {
  visible: boolean;
  onClose: any;
  onSubmit: any;
  title: string;
  loading?: boolean;
  defaultData?: any;
  buttonTitle?: string;
}) => {
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const {handleSubmit, register, formState, setValue} = methods;

  useEffect(() => {
    defaultData?.amount && setValue('amount', String(defaultData?.amount));
    defaultData?.description &&
      setValue('description', defaultData?.description);
  }, [defaultData]);

  const onCloseHandler = () => {
    onClose?.();
  };

  const onSubmitHandler = (formData: any) => {
    onSubmit?.(formData);
  };

  return (
    <ModalContainer
      isVisible={visible}
      onClose={onCloseHandler}
      style={styles.modal}
      loading={loading}>
      <FormProvider {...methods}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <VStack bg={Colors.WHITE} px="2" py="4" space="1" borderRadius="md">
            <ModalHeader text={title} onPress={onCloseHandler} />
            <CustomInput
              autoFocus
              {...register('amount')}
              label="Bid amount"
              placeholder="0"
              backgroundColor={Colors.WHITE}
              keyboardType="numeric"
              rightText="$"
              {...{formState}}
            />
            <CustomInput
              {...register('description')}
              label="Describe your proposal"
              placeholder="Enter Describe your proposal"
              backgroundColor={Colors.WHITE}
              textArea
              inputStyle={styles.input}
              {...{formState}}
            />
            <CustomButton
              mt="3"
              title={buttonTitle}
              onPress={handleSubmit(onSubmitHandler)}
            />
          </VStack>
        </TouchableWithoutFeedback>
      </FormProvider>
    </ModalContainer>
  );
};

export default React.memo(EditModal);

const styles = StyleSheet.create({
  modal: {
    borderRadius: 8,
    margin: scale(16),
    overflow: 'hidden',
  },
  input: {
    fontSize: scale(12),
    fontFamily: fontFamily.regular,
    flex: 1,
  },
});
