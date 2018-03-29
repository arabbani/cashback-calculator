import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    OperatingSystemTypeService,
    OperatingSystemTypePopupService,
    OperatingSystemTypeComponent,
    OperatingSystemTypeDetailComponent,
    OperatingSystemTypeDialogComponent,
    OperatingSystemTypePopupComponent,
    OperatingSystemTypeDeletePopupComponent,
    OperatingSystemTypeDeleteDialogComponent,
    operatingSystemTypeRoute,
    operatingSystemTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...operatingSystemTypeRoute,
    ...operatingSystemTypePopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OperatingSystemTypeComponent,
        OperatingSystemTypeDetailComponent,
        OperatingSystemTypeDialogComponent,
        OperatingSystemTypeDeleteDialogComponent,
        OperatingSystemTypePopupComponent,
        OperatingSystemTypeDeletePopupComponent,
    ],
    entryComponents: [
        OperatingSystemTypeComponent,
        OperatingSystemTypeDialogComponent,
        OperatingSystemTypePopupComponent,
        OperatingSystemTypeDeleteDialogComponent,
        OperatingSystemTypeDeletePopupComponent,
    ],
    providers: [
        OperatingSystemTypeService,
        OperatingSystemTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclOperatingSystemTypeModule {}
