import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DropDownListModule, MultiSelectModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { SwitchModule } from '@progress/kendo-angular-inputs';
import { MomentModule } from 'angular2-moment';
import { TabsModule } from 'ngx-bootstrap';

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
import { CreateOfferComponent } from './create-offer/create-offer.component';

const ENTITY_STATES = [
    ...offerRoute,
    ...offerPopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        GridModule,
        DialogModule,
        MomentModule,
        TabsModule.forRoot(),
        DropDownListModule,
        SwitchModule,
        MultiSelectModule
    ],
    declarations: [
        OfferComponent,
        OfferDetailComponent,
        OfferDialogComponent,
        OfferDeleteDialogComponent,
        OfferPopupComponent,
        OfferDeletePopupComponent,
        CreateOfferComponent,
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
export class CbclOfferModule { }
