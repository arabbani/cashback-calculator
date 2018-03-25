import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    MainReturnService,
    MainReturnPopupService,
    MainReturnComponent,
    MainReturnDetailComponent,
    MainReturnDialogComponent,
    MainReturnPopupComponent,
    MainReturnDeletePopupComponent,
    MainReturnDeleteDialogComponent,
    mainReturnRoute,
    mainReturnPopupRoute,
} from './';

const ENTITY_STATES = [
    ...mainReturnRoute,
    ...mainReturnPopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MainReturnComponent,
        MainReturnDetailComponent,
        MainReturnDialogComponent,
        MainReturnDeleteDialogComponent,
        MainReturnPopupComponent,
        MainReturnDeletePopupComponent,
    ],
    entryComponents: [
        MainReturnComponent,
        MainReturnDialogComponent,
        MainReturnPopupComponent,
        MainReturnDeleteDialogComponent,
        MainReturnDeletePopupComponent,
    ],
    providers: [
        MainReturnService,
        MainReturnPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclMainReturnModule {}
