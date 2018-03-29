import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    BusInfoService,
    BusInfoPopupService,
    BusInfoComponent,
    BusInfoDetailComponent,
    BusInfoDialogComponent,
    BusInfoPopupComponent,
    BusInfoDeletePopupComponent,
    BusInfoDeleteDialogComponent,
    busInfoRoute,
    busInfoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...busInfoRoute,
    ...busInfoPopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BusInfoComponent,
        BusInfoDetailComponent,
        BusInfoDialogComponent,
        BusInfoDeleteDialogComponent,
        BusInfoPopupComponent,
        BusInfoDeletePopupComponent,
    ],
    entryComponents: [
        BusInfoComponent,
        BusInfoDialogComponent,
        BusInfoPopupComponent,
        BusInfoDeleteDialogComponent,
        BusInfoDeletePopupComponent,
    ],
    providers: [
        BusInfoService,
        BusInfoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclBusInfoModule {}
