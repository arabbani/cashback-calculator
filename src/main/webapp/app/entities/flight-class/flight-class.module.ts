import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    FlightClassService,
    FlightClassPopupService,
    FlightClassComponent,
    FlightClassDetailComponent,
    FlightClassDialogComponent,
    FlightClassPopupComponent,
    FlightClassDeletePopupComponent,
    FlightClassDeleteDialogComponent,
    flightClassRoute,
    flightClassPopupRoute,
} from './';

const ENTITY_STATES = [
    ...flightClassRoute,
    ...flightClassPopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FlightClassComponent,
        FlightClassDetailComponent,
        FlightClassDialogComponent,
        FlightClassDeleteDialogComponent,
        FlightClassPopupComponent,
        FlightClassDeletePopupComponent,
    ],
    entryComponents: [
        FlightClassComponent,
        FlightClassDialogComponent,
        FlightClassPopupComponent,
        FlightClassDeleteDialogComponent,
        FlightClassDeletePopupComponent,
    ],
    providers: [
        FlightClassService,
        FlightClassPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclFlightClassModule {}
