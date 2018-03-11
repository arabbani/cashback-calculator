import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    OfferTypeService,
    OfferTypePopupService,
    OfferTypeComponent,
    OfferTypeDetailComponent,
    OfferTypeDialogComponent,
    OfferTypePopupComponent,
    OfferTypeDeletePopupComponent,
    OfferTypeDeleteDialogComponent,
    offerTypeRoute,
    offerTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...offerTypeRoute,
    ...offerTypePopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OfferTypeComponent,
        OfferTypeDetailComponent,
        OfferTypeDialogComponent,
        OfferTypeDeleteDialogComponent,
        OfferTypePopupComponent,
        OfferTypeDeletePopupComponent,
    ],
    entryComponents: [
        OfferTypeComponent,
        OfferTypeDialogComponent,
        OfferTypePopupComponent,
        OfferTypeDeleteDialogComponent,
        OfferTypeDeletePopupComponent,
    ],
    providers: [
        OfferTypeService,
        OfferTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclOfferTypeModule {}
