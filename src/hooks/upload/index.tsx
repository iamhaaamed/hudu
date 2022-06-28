import {useMutation} from 'react-query';
import {uploadFile} from '~/services/fileUploader';

export const useUploadFile = () => {
  return useMutation(
    async (param: any) => {
      return uploadFile(param);
    },
    {
      onSuccess: successData => {},
      onError: errorData => {
        console.log(errorData);
      },
    },
  );
};
