import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    OfferReturnService,
    OfferReturnPopupService,
    OfferReturnComponent,
    OfferReturnDetailComponent,
    OfferReturnDialogComponent,
    OfferReturnPopupComponent,
    OfferReturnDeletePopupComponent,
    OfferReturnDeleteDialogComponent,
    offerReturnRoute,
    offerReturnPopupRoute,
} from './';

const ENTITY_STATES = [
    ...offerReturnRoute,
    ...offerReturnPopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OfferReturnComponent,
        OfferReturnDetailComponent,
        OfferReturnDialogComponent,
        OfferReturnDeleteDialogComponent,
        OfferReturnPopupComponent,
        OfferReturnDeletePopupComponent,
    ],
    entryComponents: [
        OfferReturnComponent,
        OfferReturnDialogComponent,
        OfferReturnPopupComponent,
        OfferReturnDeleteDialogComponent,
        OfferReturnDeletePopupComponent,
    ],
    providers: [
        OfferReturnService,
        OfferReturnPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclOfferReturnModule {}
