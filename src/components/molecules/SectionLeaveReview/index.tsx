import React, {useState} from 'react';
import {verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import {CustomButton, ReviewModal} from '~/components';
import {useAddFeedBack} from '~/hooks/project';
import {ResponseStatus} from '~/generated/graphql';

const SectionLeaveReview = ({bidId}: {bidId?: number}) => {
  const {mutate: mutateAddFeedBack, isLoading: addFeedBackLoading} =
    useAddFeedBack();
  const [reviewModalVisible, setReviewModalVisible] = useState(false);

  const reviewOnPress = () => {
    setReviewModalVisible(true);
  };

  const onCloseReviewModal = () => {
    setReviewModalVisible(false);
  };

  const onSubmitReviewModal = (formData: any) => {
    const input = {
      bidId,
      hudusRate: formData?.rate,
      hudusComment: formData?.review,
      listersRate: formData?.rate,
      listersComment: formData?.review,
    };
    mutateAddFeedBack(input, {
      onSuccess: successData => {
        if (
          successData?.project_addFeedBack?.status === ResponseStatus.Success
        ) {
          setReviewModalVisible(false);
        }
      },
    });
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
        title={'Rate your lister'}
        loading={addFeedBackLoading}
      />
    </>
  );
};

export default SectionLeaveReview;
