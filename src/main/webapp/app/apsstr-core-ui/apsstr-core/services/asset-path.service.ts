import { Injectable } from '@angular/core';
import { ASSET_PATH, ASSET_TYPE } from '../../../apsstr-core-ui-config';

@Injectable()
export class AssetPathService {

  private imageBase = ASSET_PATH.imageBase;
  private logoPath = ASSET_PATH.logo;
  private avatarPath = ASSET_PATH.avatar;

  constructor() { }

  constructImagePath(imageName: string, assetType: string, imageType: string): string {
    let url = this.imageBase;
    switch (assetType) {
      case ASSET_TYPE.logo:
        url += this.logoPath;
        break;
      case ASSET_TYPE.avatar:
        url += this.avatarPath;
        break;
    }
    return url + imageName + '.' + imageType;
  }

}
