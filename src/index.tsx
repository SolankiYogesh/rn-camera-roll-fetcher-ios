import { Platform } from 'react-native';
import RnCameraRollFetcherIos from './NativeRnCameraRollFetcherIos';

export function getFileUri(phUri: string): Promise<string | null> {
  if (Platform.OS !== 'ios') {
    return Promise.resolve(phUri);
  }
  return RnCameraRollFetcherIos.getFileUri(phUri);
}
