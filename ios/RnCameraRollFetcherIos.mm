#import "RnCameraRollFetcherIos.h"
#import <React/RCTUtils.h>
#import <Photos/Photos.h>

@implementation RnCameraRollFetcherIos
RCT_EXPORT_MODULE()

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRnCameraRollFetcherIosSpecJSI>(params);
}

- (void)getFileUri:(nonnull NSString *)phUri resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
  if ([phUri hasPrefix:@"ph://"]) {
      phUri = [phUri substringFromIndex:5]; // remove "ph://"
  }
  PHFetchResult<PHAsset *> *results = [PHAsset fetchAssetsWithLocalIdentifiers:@[phUri] options:nil];
  PHAsset *asset = [results firstObject];
  
  if (!asset) {
      resolve(nil);
      return;
  }
  
  NSArray<PHAssetResource *> *resources = [PHAssetResource assetResourcesForAsset:asset];
  PHAssetResource *resource = nil;
  if (asset.mediaType == PHAssetMediaTypeVideo) {
      for (PHAssetResource *res in resources) {
          if (res.type == PHAssetResourceTypeVideo) {
              resource = res;
              break;
          }
      }
  }
  if (!resource) {
      resource = [resources firstObject];
  }
  
  
  NSString *fileName = resource.originalFilename ?: @"tempAsset";
  NSString *tmpDir = NSTemporaryDirectory();
  NSString *tmpPath = [tmpDir stringByAppendingPathComponent:fileName];
  NSURL *tmpURL = [NSURL fileURLWithPath:tmpPath];
  
  [[NSFileManager defaultManager] removeItemAtURL:tmpURL error:nil];
  
  [[PHAssetResourceManager defaultManager] writeDataForAssetResource:resource
                                                              toFile:tmpURL
                                                             options:nil
                                                   completionHandler:^(NSError * _Nullable error) {
      if (error) {
          reject(@"ERR_PHOTO", error.localizedDescription, error);
      } else {
          resolve(tmpURL.absoluteString);
      }
  }];
}

@end
