import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    ReturnExtrasService,
    ReturnExtrasPopupService,
    ReturnExtrasComponent,
    ReturnExtrasDetailComponent,
    ReturnExtrasDialogComponent,
    ReturnExtrasPopupComponent,
    ReturnExtrasDeletePopupComponent,
    ReturnExtrasDeleteDialogComponent,
    returnExtrasRoute,
    returnExtrasPopupRoute,
} from './';

const ENTITY_STATES = [
    ...returnExtrasRoute,
    ...returnExtrasPopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReturnExtrasComponent,
        ReturnExtrasDetailComponent,
        ReturnExtrasDialogComponent,
        ReturnExtrasDeleteDialogComponent,
        ReturnExtrasPopupComponent,
        ReturnExtrasDeletePopupComponent,
    ],
    entryComponents: [
        ReturnExtrasComponent,
        ReturnExtrasDialogComponent,
        ReturnExtrasPopupComponent,
        ReturnExtrasDeleteDialogComponent,
        ReturnExtrasDeletePopupComponent,
    ],
    providers: [
        ReturnExtrasService,
        ReturnExtrasPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclReturnExtrasModule {}
