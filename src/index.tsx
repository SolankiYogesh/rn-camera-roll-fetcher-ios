import RnCameraRollFetcherIos from './NativeRnCameraRollFetcherIos';

export function getFileUri(phUri: string): Promise<string | null> {
  return RnCameraRollFetcherIos.getFileUri(phUri);
}
