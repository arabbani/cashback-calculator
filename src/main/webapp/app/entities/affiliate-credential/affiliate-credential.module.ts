import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    AffiliateCredentialService,
    AffiliateCredentialPopupService,
    AffiliateCredentialComponent,
    AffiliateCredentialDetailComponent,
    AffiliateCredentialDialogComponent,
    AffiliateCredentialPopupComponent,
    AffiliateCredentialDeletePopupComponent,
    AffiliateCredentialDeleteDialogComponent,
    affiliateCredentialRoute,
    affiliateCredentialPopupRoute,
} from './';

const ENTITY_STATES = [
    ...affiliateCredentialRoute,
    ...affiliateCredentialPopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AffiliateCredentialComponent,
        AffiliateCredentialDetailComponent,
        AffiliateCredentialDialogComponent,
        AffiliateCredentialDeleteDialogComponent,
        AffiliateCredentialPopupComponent,
        AffiliateCredentialDeletePopupComponent,
    ],
    entryComponents: [
        AffiliateCredentialComponent,
        AffiliateCredentialDialogComponent,
        AffiliateCredentialPopupComponent,
        AffiliateCredentialDeleteDialogComponent,
        AffiliateCredentialDeletePopupComponent,
    ],
    providers: [
        AffiliateCredentialService,
        AffiliateCredentialPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclAffiliateCredentialModule {}
