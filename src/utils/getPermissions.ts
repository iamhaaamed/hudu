import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export async function requestLocationPermission(): Promise<boolean> {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      const grantedAllTheTime = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        //@ts-ignore
        {
          title: 'Background Location Permission',
          message:
            'Drives And Detours collects location data to record the route you drive even when the app is closed or not in use.',
        },
      );

      return (
        granted === PermissionsAndroid.RESULTS.GRANTED ||
        grantedAllTheTime === PermissionsAndroid.RESULTS.GRANTED
      );
    }

    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      return auth === 'granted';
    }
  } catch (err) {
    console.warn(err);
  }
  return false;
}
export async function requestWritePermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}
