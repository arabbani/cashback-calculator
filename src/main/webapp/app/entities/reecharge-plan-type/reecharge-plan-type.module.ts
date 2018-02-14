import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    ReechargePlanTypeService,
    ReechargePlanTypePopupService,
    ReechargePlanTypeComponent,
    ReechargePlanTypeDetailComponent,
    ReechargePlanTypeDialogComponent,
    ReechargePlanTypePopupComponent,
    ReechargePlanTypeDeletePopupComponent,
    ReechargePlanTypeDeleteDialogComponent,
    reechargePlanTypeRoute,
    reechargePlanTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...reechargePlanTypeRoute,
    ...reechargePlanTypePopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReechargePlanTypeComponent,
        ReechargePlanTypeDetailComponent,
        ReechargePlanTypeDialogComponent,
        ReechargePlanTypeDeleteDialogComponent,
        ReechargePlanTypePopupComponent,
        ReechargePlanTypeDeletePopupComponent,
    ],
    entryComponents: [
        ReechargePlanTypeComponent,
        ReechargePlanTypeDialogComponent,
        ReechargePlanTypePopupComponent,
        ReechargePlanTypeDeleteDialogComponent,
        ReechargePlanTypeDeletePopupComponent,
    ],
    providers: [
        ReechargePlanTypeService,
        ReechargePlanTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclReechargePlanTypeModule {}
