import React, {useRef, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {HStack} from 'native-base';
import {verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import {CustomButton, ReviewModal} from '~/components';

const SectionFinishProject = ({projectId}: {projectId: number}) => {
  const [reviewModalVisible, setReviewModalVisible] = useState(false);

  const finishProjectOnPress = () => {
    setReviewModalVisible(true);
  };

  const onCloseReviewModal = () => {
    setReviewModalVisible(false);
  };

  const onSubmitReviewModal = (formData: any) => {
    setReviewModalVisible(false);
  };

  return (
    <>
      <CustomButton
        outline
        title="Finish project"
        onPress={finishProjectOnPress}
        color={Colors.BLACK_3}
        height={verticalScale(35)}
      />
      <ReviewModal
        visible={reviewModalVisible}
        onClose={onCloseReviewModal}
        onSubmit={onSubmitReviewModal}
        title={'Rate your HUDUr'}
      />
    </>
  );
};

export default SectionFinishProject;
