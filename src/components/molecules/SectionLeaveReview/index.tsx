import React, {useState} from 'react';
import {verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import {CustomButton, ReviewModal} from '~/components';

const SectionLeaveReview = ({item, type}: {item: any; type?: string}) => {
  const isLister = type === 'lister';
  const [reviewModalVisible, setReviewModalVisible] = useState(false);

  const reviewOnPress = () => {
    setReviewModalVisible(true);
  };

  const onCloseReviewModal = () => {
    setReviewModalVisible(false);
  };

  const onSubmitReviewModal = (formData: any) => {
    if (isLister) {
    } else {
    }
    setReviewModalVisible(false);
  };

  return (
    <>
      <CustomButton
        outline
        title="Leave a review"
        onPress={reviewOnPress}
        color={Colors.BLACK_3}
        height={verticalScale(35)}
      />
      <ReviewModal
        visible={reviewModalVisible}
        onClose={onCloseReviewModal}
        onSubmit={onSubmitReviewModal}
        title={isLister ? 'Rate your lister' : 'Rate your HUDUr'}
      />
    </>
  );
};

export default SectionLeaveReview;
