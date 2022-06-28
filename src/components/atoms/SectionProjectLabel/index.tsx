import React from 'react';
import {Text, Center} from 'native-base';
import {scale, fontFamily} from '~/utils/style';
import {Colors} from '~/styles';

const SectionProjectLabel = ({item}: {item?: any}) => {
  const getProjectType = () => {
    switch (item?.project?.projectStatus) {
      case 'BIDDING':
        return {
          text: 'Bidding',
          backgroundColor: Colors.WAITING_BACKGROUND,
          color: Colors.INFO,
        };
      case 'WAITING':
        return {
          text: 'Waiting',
          backgroundColor: Colors.WAITING_BACKGROUND,
          color: Colors.INFO,
        };
      case 'IN_PROGRESS':
        return {
          text: 'In progress',
          backgroundColor: Colors.IN_PROGRESS_BACKGROUND,
          color: Colors.SUCCESS,
        };
      case 'FAILED':
        return {
          text: 'Failed',
          backgroundColor: Colors.FAILED_BACKGROUND,
          color: Colors.ERROR,
        };
      case 'FINISHED':
        return {
          text: 'Finished',
          backgroundColor: Colors.FINISHED_BACKGROUND,
          color: Colors.FINISHED_COLOR,
        };
      default:
        return {
          text: '',
          backgroundColor: Colors.TRANSPARENT,
          color: Colors.TRANSPARENT,
        };
    }
  };

  const projectStatus = getProjectType();

  return (
    <Center borderRadius="md" bg={projectStatus?.backgroundColor}>
      <Text
        px="4"
        zIndex={11}
        fontSize={scale(14)}
        fontFamily={fontFamily.regular}
        color={projectStatus?.color}>
        {projectStatus?.text}
      </Text>
    </Center>
  );
};

export default SectionProjectLabel;
