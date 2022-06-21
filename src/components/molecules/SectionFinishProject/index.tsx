import React, {useState} from 'react';
import {verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import {CustomButton, ReviewModal} from '~/components';
import {useAddFeedBack, useFinishProject} from '~/hooks/project';
import {ResponseStatus} from '~/generated/graphql';

const SectionFinishProject = ({
  projectId,
  bidId,
}: {
  projectId: number;
  bidId: number;
}) => {
  const {mutate: mutateFinishProject, isLoading: finishProjectLoading} =
    useFinishProject();
  const {mutate: mutateAddFeedBack, isLoading: addFeedBackLoading} =
    useAddFeedBack();

  const [reviewModalVisible, setReviewModalVisible] = useState(false);

  const finishProjectOnPress = () => {
    mutateFinishProject(projectId, {
      onSuccess: (successData: any) => {
        if (
          successData?.project_finisheProject?.status === ResponseStatus.Success
        ) {
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
      bidId,
      listersRate: formData?.rate,
      listersComment: formData?.review,
    };
    mutateAddFeedBack(input, {
      onSuccess: (successData: any) => {
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
