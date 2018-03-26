import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    AffiliateService,
    AffiliatePopupService,
    AffiliateComponent,
    AffiliateDetailComponent,
    AffiliateDialogComponent,
    AffiliatePopupComponent,
    AffiliateDeletePopupComponent,
    AffiliateDeleteDialogComponent,
    affiliateRoute,
    affiliatePopupRoute,
} from './';

const ENTITY_STATES = [
    ...affiliateRoute,
    ...affiliatePopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AffiliateComponent,
        AffiliateDetailComponent,
        AffiliateDialogComponent,
        AffiliateDeleteDialogComponent,
        AffiliatePopupComponent,
        AffiliateDeletePopupComponent,
    ],
    entryComponents: [
        AffiliateComponent,
        AffiliateDialogComponent,
        AffiliatePopupComponent,
        AffiliateDeleteDialogComponent,
        AffiliateDeletePopupComponent,
    ],
    providers: [
        AffiliateService,
        AffiliatePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclAffiliateModule {}
