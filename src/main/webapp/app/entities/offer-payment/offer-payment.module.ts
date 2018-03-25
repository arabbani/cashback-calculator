import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    OfferPaymentService,
    OfferPaymentPopupService,
    OfferPaymentComponent,
    OfferPaymentDetailComponent,
    OfferPaymentDialogComponent,
    OfferPaymentPopupComponent,
    OfferPaymentDeletePopupComponent,
    OfferPaymentDeleteDialogComponent,
    offerPaymentRoute,
    offerPaymentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...offerPaymentRoute,
    ...offerPaymentPopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OfferPaymentComponent,
        OfferPaymentDetailComponent,
        OfferPaymentDialogComponent,
        OfferPaymentDeleteDialogComponent,
        OfferPaymentPopupComponent,
        OfferPaymentDeletePopupComponent,
    ],
    entryComponents: [
        OfferPaymentComponent,
        OfferPaymentDialogComponent,
        OfferPaymentPopupComponent,
        OfferPaymentDeleteDialogComponent,
        OfferPaymentDeletePopupComponent,
    ],
    providers: [
        OfferPaymentService,
        OfferPaymentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclOfferPaymentModule {}
