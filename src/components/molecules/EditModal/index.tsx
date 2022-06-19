import React from 'react';
import {StyleSheet} from 'react-native';
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
  amount: yup.number().required('required'),
  describe: yup.string().required('required'),
});

const EditModal = ({
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
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const {handleSubmit, register, formState} = methods;

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
        <VStack bg={Colors.WHITE} px="2" py="4" space="4" borderRadius="md">
          <ModalHeader text={title} />
          <CustomInput
            {...register('amount')}
            label="Bid amount"
            placeholder="0"
            backgroundColor={Colors.WHITE}
            keyboardType="numeric"
            rightText="$"
            {...{formState}}
          />
          <CustomInput
            {...register('describe')}
            label="Describe your proposal"
            placeholder="Enter Describe your proposal"
            backgroundColor={Colors.WHITE}
            textArea
            inputStyle={styles.input}
            {...{formState}}
          />
          <CustomButton
            title="Submit bid"
            onPress={handleSubmit(onSubmitHandler)}
          />
        </VStack>
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
