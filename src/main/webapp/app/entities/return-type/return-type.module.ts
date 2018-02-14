import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    ReturnTypeService,
    ReturnTypePopupService,
    ReturnTypeComponent,
    ReturnTypeDetailComponent,
    ReturnTypeDialogComponent,
    ReturnTypePopupComponent,
    ReturnTypeDeletePopupComponent,
    ReturnTypeDeleteDialogComponent,
    returnTypeRoute,
    returnTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...returnTypeRoute,
    ...returnTypePopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReturnTypeComponent,
        ReturnTypeDetailComponent,
        ReturnTypeDialogComponent,
        ReturnTypeDeleteDialogComponent,
        ReturnTypePopupComponent,
        ReturnTypeDeletePopupComponent,
    ],
    entryComponents: [
        ReturnTypeComponent,
        ReturnTypeDialogComponent,
        ReturnTypePopupComponent,
        ReturnTypeDeleteDialogComponent,
        ReturnTypeDeletePopupComponent,
    ],
    providers: [
        ReturnTypeService,
        ReturnTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclReturnTypeModule {}
