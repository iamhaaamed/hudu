import React, {useState} from 'react';
import {verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import {CustomButton, ChooseHudurModal} from '~/components';

const SectionChooseHudur = ({projectId}: {projectId: number}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const chooseHudurOnPress = () => {
    setModalVisible(true);
  };

  const onCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <CustomButton
        outline
        title="Choose a HUDUr"
        onPress={chooseHudurOnPress}
        color={Colors.BLACK_3}
        height={verticalScale(35)}
      />
      <ChooseHudurModal
        visible={modalVisible}
        onClose={onCloseModal}
        title={'Active bids'}
        projectId={projectId}
      />
    </>
  );
};

export default SectionChooseHudur;
