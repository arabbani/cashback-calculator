import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    TravelTypeService,
    TravelTypePopupService,
    TravelTypeComponent,
    TravelTypeDetailComponent,
    TravelTypeDialogComponent,
    TravelTypePopupComponent,
    TravelTypeDeletePopupComponent,
    TravelTypeDeleteDialogComponent,
    travelTypeRoute,
    travelTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...travelTypeRoute,
    ...travelTypePopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TravelTypeComponent,
        TravelTypeDetailComponent,
        TravelTypeDialogComponent,
        TravelTypeDeleteDialogComponent,
        TravelTypePopupComponent,
        TravelTypeDeletePopupComponent,
    ],
    entryComponents: [
        TravelTypeComponent,
        TravelTypeDialogComponent,
        TravelTypePopupComponent,
        TravelTypeDeleteDialogComponent,
        TravelTypeDeletePopupComponent,
    ],
    providers: [
        TravelTypeService,
        TravelTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclTravelTypeModule {}
