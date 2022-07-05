import React, {useState} from 'react';
import {verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import {CustomButton, ReviewModal, QuestionModal} from '~/components';
import {useAddFeedBack, useFinishProject} from '~/hooks/project';
import {ResponseStatus} from '~/generated/graphql';

const SectionFinishProject = ({
  projectId,
  currentBid,
}: {
  projectId: number;
  currentBid: any;
}) => {
  const {mutate: mutateFinishProject, isLoading: finishProjectLoading} =
    useFinishProject();
  const {mutate: mutateAddFeedBack, isLoading: addFeedBackLoading} =
    useAddFeedBack();

  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [finishModalVisible, setFinishModalVisible] = useState<boolean>(false);

  const finishProjectOnPress = () => {
    setFinishModalVisible(true);
  };

  const onCloseFinishModal = () => {
    setFinishModalVisible(false);
  };

  const onAcceptFinishModal = () => {
    mutateFinishProject(projectId, {
      onSuccess: successData => {
        if (
          successData?.project_finisheProject?.status === ResponseStatus.Success
        ) {
          setFinishModalVisible(false);
          setReviewModalVisible(true);
        }
      },
    });
  };

  const onCloseReviewModal = () => {
    setReviewModalVisible(false);
  };

  const onSubmitReviewModal = (formData: any) => {
    const input = {
      bidId: currentBid?.id,
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
        title="Finish project"
        onPress={finishProjectOnPress}
        color={Colors.BLACK_3}
        height={verticalScale(35)}
        loading={finishProjectLoading}
        spinnerColor={Colors.BLACK_3}
      />
      <QuestionModal
        visible={finishModalVisible}
        onClose={onCloseFinishModal}
        title="Are you sur you want finish this project?"
        option1="No"
        option2="Yes"
        option1OnPress={onCloseFinishModal}
        option2OnPress={onAcceptFinishModal}
        loading={finishProjectLoading}
      />
      <ReviewModal
        visible={reviewModalVisible}
        onClose={onCloseReviewModal}
        onSubmit={onSubmitReviewModal}
        title={'Rate your HUDUr'}
        loading={addFeedBackLoading}
      />
    </>
  );
};

export default SectionFinishProject;
