import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    DateService,
    DatePopupService,
    DateComponent,
    DateDetailComponent,
    DateDialogComponent,
    DatePopupComponent,
    DateDeletePopupComponent,
    DateDeleteDialogComponent,
    dateRoute,
    datePopupRoute,
} from './';

const ENTITY_STATES = [
    ...dateRoute,
    ...datePopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DateComponent,
        DateDetailComponent,
        DateDialogComponent,
        DateDeleteDialogComponent,
        DatePopupComponent,
        DateDeletePopupComponent,
    ],
    entryComponents: [
        DateComponent,
        DateDialogComponent,
        DatePopupComponent,
        DateDeleteDialogComponent,
        DateDeletePopupComponent,
    ],
    providers: [
        DateService,
        DatePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclDateModule {}
