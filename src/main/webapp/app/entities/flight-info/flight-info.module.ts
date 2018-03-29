import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    FlightInfoService,
    FlightInfoPopupService,
    FlightInfoComponent,
    FlightInfoDetailComponent,
    FlightInfoDialogComponent,
    FlightInfoPopupComponent,
    FlightInfoDeletePopupComponent,
    FlightInfoDeleteDialogComponent,
    flightInfoRoute,
    flightInfoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...flightInfoRoute,
    ...flightInfoPopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FlightInfoComponent,
        FlightInfoDetailComponent,
        FlightInfoDialogComponent,
        FlightInfoDeleteDialogComponent,
        FlightInfoPopupComponent,
        FlightInfoDeletePopupComponent,
    ],
    entryComponents: [
        FlightInfoComponent,
        FlightInfoDialogComponent,
        FlightInfoPopupComponent,
        FlightInfoDeleteDialogComponent,
        FlightInfoDeletePopupComponent,
    ],
    providers: [
        FlightInfoService,
        FlightInfoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclFlightInfoModule {}
