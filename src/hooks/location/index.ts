import {showMessage} from 'react-native-flash-message';
import {useMutation} from 'react-query';

export const useGetLocation = () => {
  return useMutation((zipCode: number) => getLocation(zipCode), {
    onSuccess: successData => {
      if (successData?.status === 1) {
      } else {
        showMessage({
          message: 'Zip code not valid',
          type: 'danger',
          icon: 'danger',
        });
      }
    },
    onError: () => {
      showMessage({
        message: 'Error in get location from your zip code',
        type: 'danger',
        icon: 'danger',
      });
    },
  });
};

const getLocation = async (zipCode: number) => {
  const url = `https://api.promaptools.com/service/us/zip-lat-lng/get/?zip=${zipCode}&key=17o8dysaCDrgv1c`;
  let response = await fetch(url);
  let json = await response.json();
  return json;
};
