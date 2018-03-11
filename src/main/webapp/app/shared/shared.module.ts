import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import {
    CbclSharedLibsModule,
    CbclSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    ApsstrLoginModalComponent,
    Principal,
    HasAnyAuthorityDirective,
    ApsstrSocialComponent,
    SocialService,
} from './';

@NgModule({
    imports: [
        CbclSharedLibsModule,
        CbclSharedCommonModule
    ],
    declarations: [
        ApsstrSocialComponent,
        ApsstrLoginModalComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        SocialService,
        UserService,
        DatePipe
    ],
    entryComponents: [ApsstrLoginModalComponent],
    exports: [
        CbclSharedCommonModule,
        ApsstrSocialComponent,
        ApsstrLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class CbclSharedModule {}
