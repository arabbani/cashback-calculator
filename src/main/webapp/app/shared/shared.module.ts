import { DatePipe } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    AccountService, ApsstrLoginModalComponent, ApsstrSocialComponent, AuthServerProvider,
    CbclSharedCommonModule, CbclSharedLibsModule, CSRFService, HasAnyAuthorityDirective,
    LoginModalService, LoginService, Principal, SocialService, StateStorageService, UserService
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
export class CbclSharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CbclSharedModule,
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
            ]
        };
    }
}
