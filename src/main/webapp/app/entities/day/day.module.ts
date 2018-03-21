import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    DayService,
    DayPopupService,
    DayComponent,
    DayDetailComponent,
    DayDialogComponent,
    DayPopupComponent,
    DayDeletePopupComponent,
    DayDeleteDialogComponent,
    dayRoute,
    dayPopupRoute,
} from './';

const ENTITY_STATES = [
    ...dayRoute,
    ...dayPopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DayComponent,
        DayDetailComponent,
        DayDialogComponent,
        DayDeleteDialogComponent,
        DayPopupComponent,
        DayDeletePopupComponent,
    ],
    entryComponents: [
        DayComponent,
        DayDialogComponent,
        DayPopupComponent,
        DayDeleteDialogComponent,
        DayDeletePopupComponent,
    ],
    providers: [
        DayService,
        DayPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclDayModule {}
