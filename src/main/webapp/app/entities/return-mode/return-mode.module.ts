import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    ReturnModeService,
    ReturnModePopupService,
    ReturnModeComponent,
    ReturnModeDetailComponent,
    ReturnModeDialogComponent,
    ReturnModePopupComponent,
    ReturnModeDeletePopupComponent,
    ReturnModeDeleteDialogComponent,
    returnModeRoute,
    returnModePopupRoute,
} from './';

const ENTITY_STATES = [
    ...returnModeRoute,
    ...returnModePopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReturnModeComponent,
        ReturnModeDetailComponent,
        ReturnModeDialogComponent,
        ReturnModeDeleteDialogComponent,
        ReturnModePopupComponent,
        ReturnModeDeletePopupComponent,
    ],
    entryComponents: [
        ReturnModeComponent,
        ReturnModeDialogComponent,
        ReturnModePopupComponent,
        ReturnModeDeleteDialogComponent,
        ReturnModeDeletePopupComponent,
    ],
    providers: [
        ReturnModeService,
        ReturnModePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclReturnModeModule {}
