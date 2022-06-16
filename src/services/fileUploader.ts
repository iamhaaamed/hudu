import {Platform} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import RNFetchBlob from 'rn-fetch-blob';

export const uploadFile = async (param: any) => {
  const uri = param?.path;
  const mime: string = param?.mime;
  const name: string = param?.filename ?? `image${Date.now()}`;

  return new Promise(async (resolve, reject) => {
    try {
      const sasContainerUri = 'https://apshudustorage.blob.core.windows.net';
      const customBlobName = Math.random().toString(16).slice(2);
      const container = 'images';
      const sasToken =
        'sp=racwdli&st=2022-06-14T08:24:20Z&se=2122-06-14T16:24:20Z&spr=https&sv=2021-06-08&sr=c&sig=rSR9UAW9mh%2BqAIJCFpyDeBFZ1BR9GQefyjDK0VKzBrw%3D'; // you may need to play with other html verbs in this string e.g., `sp`, `ss` e.t.c.
      const assetPath = `${sasContainerUri}/${container}/${customBlobName}${name}`;

      const localUri =
        Platform.OS === 'ios' ? uri.replace('file://', '/') : uri;
      const res = await RNFetchBlob.fetch(
        'PUT',
        `${assetPath}?${sasToken}`,
        {
          'x-ms-blob-type': 'BlockBlob',
          'content-type': 'application/octet-stream',
          'x-ms-blob-content-type': mime || 'image/png',
        },
        RNFetchBlob.wrap(localUri),
      );
      if (res.respInfo.status === 201) {
        resolve({...res, uploadedUrl: res?.respInfo?.redirects?.[0]});
      }
    } catch (error) {
      console.log(error, 'error');
      showMessage({
        message: JSON.stringify(error),
        type: 'danger',
        icon: 'danger',
      });
      reject(error);
    }
  });
};
