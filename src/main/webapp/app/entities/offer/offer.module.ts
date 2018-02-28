import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';

import { CbclSharedModule } from '../../shared';
import {
    OfferComponent,
    OfferDeleteDialogComponent,
    OfferDeletePopupComponent,
    OfferDetailComponent,
    OfferDialogComponent,
    OfferPopupComponent,
    offerPopupRoute,
    OfferPopupService,
    offerRoute,
    OfferService,
} from './';

const ENTITY_STATES = [
    ...offerRoute,
    ...offerPopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        GridModule,
        DialogModule
    ],
    declarations: [
        OfferComponent,
        OfferDetailComponent,
        OfferDialogComponent,
        OfferDeleteDialogComponent,
        OfferPopupComponent,
        OfferDeletePopupComponent,
    ],
    entryComponents: [
        OfferComponent,
        OfferDialogComponent,
        OfferPopupComponent,
        OfferDeleteDialogComponent,
        OfferDeletePopupComponent,
    ],
    providers: [
        OfferService,
        OfferPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclOfferModule {}
