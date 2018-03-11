import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    CircleService,
    CirclePopupService,
    CircleComponent,
    CircleDetailComponent,
    CircleDialogComponent,
    CirclePopupComponent,
    CircleDeletePopupComponent,
    CircleDeleteDialogComponent,
    circleRoute,
    circlePopupRoute,
} from './';

const ENTITY_STATES = [
    ...circleRoute,
    ...circlePopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CircleComponent,
        CircleDetailComponent,
        CircleDialogComponent,
        CircleDeleteDialogComponent,
        CirclePopupComponent,
        CircleDeletePopupComponent,
    ],
    entryComponents: [
        CircleComponent,
        CircleDialogComponent,
        CirclePopupComponent,
        CircleDeleteDialogComponent,
        CircleDeletePopupComponent,
    ],
    providers: [
        CircleService,
        CirclePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclCircleModule {}
