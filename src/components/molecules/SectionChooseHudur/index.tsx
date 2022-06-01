import React, {useState} from 'react';
import {verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import {CustomButton, ChooseHudurModal} from '~/components';
import images from '~/assets/images';

const hudurData = [
  {
    id: 0,
    name: 'BCcontracting',
    rate: 4,
    totalReview: 200,
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
    bidAmount: 150,
    image: images.testImage1,
  },
  {
    id: 1,
    name: 'BCcontracting1',
    rate: 2,
    totalReview: 100,
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
    bidAmount: 96,
    image: images.testImage1,
  },
];

const SectionChooseHudur = ({item}: {item: any}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const chooseHudurOnPress = () => {
    setModalVisible(true);
  };

  const onCloseModal = () => {
    setModalVisible(false);
  };

  const onSubmitModal = (formData: any) => {
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
        data={hudurData}
        visible={modalVisible}
        onClose={onCloseModal}
        onSubmit={onSubmitModal}
        title={'Active bids'}
      />
    </>
  );
};

export default SectionChooseHudur;
