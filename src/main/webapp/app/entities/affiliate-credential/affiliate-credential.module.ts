import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';

import { ApsstrSharedModule } from '../../apsstr-core-ui';
import { CbclSharedModule } from '../../shared';
import { AffiliateCredentialComponent, affiliateCredentialRoute, AffiliateCredentialService } from './';

const ENTITY_STATES = [
    affiliateCredentialRoute
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        ReactiveFormsModule,
        GridModule,
        DialogModule,
        ApsstrSharedModule,
        NgSelectModule
    ],
    declarations: [
        AffiliateCredentialComponent
    ],
    entryComponents: [
        AffiliateCredentialComponent
    ],
    providers: [
        AffiliateCredentialService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclAffiliateCredentialModule { }
