import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApsstrSharedModule } from '../apsstr-core-ui';
import { CbclSharedModule } from '../shared';
import {
    accountState, ActivateComponent, ActivateService, PasswordComponent,
    PasswordResetFinishComponent, PasswordResetFinishService, PasswordResetInitComponent,
    PasswordResetInitService, PasswordService, PasswordStrengthBarComponent, Register,
    RegisterComponent, SessionsComponent, SessionsService, SettingsComponent, SocialRegisterComponent
} from './';

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(accountState),
        ApsstrSharedModule
    ],
    declarations: [
        SocialRegisterComponent,
        ActivateComponent,
        RegisterComponent,
        PasswordComponent,
        PasswordStrengthBarComponent,
        PasswordResetInitComponent,
        PasswordResetFinishComponent,
        SessionsComponent,
        SettingsComponent
    ],
    providers: [
        SessionsService,
        Register,
        ActivateService,
        PasswordService,
        PasswordResetInitService,
        PasswordResetFinishService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclAccountModule {}
