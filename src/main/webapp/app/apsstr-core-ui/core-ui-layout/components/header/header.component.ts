import { Component, OnInit } from '@angular/core';
import { AssetPathService } from '../../../apsstr-core/services';
import { ASSET_TYPE } from '../../../../apsstr-core-ui-config';

@Component({
  selector: 'apsstr-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(private assetPathService: AssetPathService) { }

  ngOnInit() {
  }

  constructImagePath(imageName: string, imageType: string) {
    return this.assetPathService.constructImagePath(imageName, ASSET_TYPE.avatar, imageType);
  }

}
