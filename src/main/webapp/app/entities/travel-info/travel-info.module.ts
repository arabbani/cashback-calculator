import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    TravelInfoService,
    TravelInfoPopupService,
    TravelInfoComponent,
    TravelInfoDetailComponent,
    TravelInfoDialogComponent,
    TravelInfoPopupComponent,
    TravelInfoDeletePopupComponent,
    TravelInfoDeleteDialogComponent,
    travelInfoRoute,
    travelInfoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...travelInfoRoute,
    ...travelInfoPopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TravelInfoComponent,
        TravelInfoDetailComponent,
        TravelInfoDialogComponent,
        TravelInfoDeleteDialogComponent,
        TravelInfoPopupComponent,
        TravelInfoDeletePopupComponent,
    ],
    entryComponents: [
        TravelInfoComponent,
        TravelInfoDialogComponent,
        TravelInfoPopupComponent,
        TravelInfoDeleteDialogComponent,
        TravelInfoDeletePopupComponent,
    ],
    providers: [
        TravelInfoService,
        TravelInfoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclTravelInfoModule {}
