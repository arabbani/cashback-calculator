import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    OfferPolicyService,
    OfferPolicyPopupService,
    OfferPolicyComponent,
    OfferPolicyDetailComponent,
    OfferPolicyDialogComponent,
    OfferPolicyPopupComponent,
    OfferPolicyDeletePopupComponent,
    OfferPolicyDeleteDialogComponent,
    offerPolicyRoute,
    offerPolicyPopupRoute,
} from './';

const ENTITY_STATES = [
    ...offerPolicyRoute,
    ...offerPolicyPopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OfferPolicyComponent,
        OfferPolicyDetailComponent,
        OfferPolicyDialogComponent,
        OfferPolicyDeleteDialogComponent,
        OfferPolicyPopupComponent,
        OfferPolicyDeletePopupComponent,
    ],
    entryComponents: [
        OfferPolicyComponent,
        OfferPolicyDialogComponent,
        OfferPolicyPopupComponent,
        OfferPolicyDeleteDialogComponent,
        OfferPolicyDeletePopupComponent,
    ],
    providers: [
        OfferPolicyService,
        OfferPolicyPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclOfferPolicyModule {}
