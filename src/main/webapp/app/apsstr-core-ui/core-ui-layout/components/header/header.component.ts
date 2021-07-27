import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ASSET_TYPE } from '../../../../apsstr-core-ui-config';
import { ProfileService } from '../../../../layouts';
import { LoginModalService, LoginService, Principal } from '../../../../shared';
import { AssetPathService } from '../../../apsstr-core/services';

@Component({
    selector: 'apsstr-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    modalRef: NgbModalRef;
    swaggerEnabled: boolean;

    constructor(private assetPathService: AssetPathService, private principal: Principal,
    private loginModalService: LoginModalService, private router: Router,
    private loginService: LoginService, private profileService: ProfileService) {}

    ngOnInit() {
      this.profileService.getProfileInfo().then((profileInfo) => {
        this.swaggerEnabled = profileInfo.swaggerEnabled;
    });
    }

    constructImagePath(imageName: string, imageType: string) {
        return this.assetPathService.constructImagePath(imageName, ASSET_TYPE.avatar, imageType);
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
      this.loginService.logout();
      this.router.navigate(['']);
  }

}
