import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    ReturnInfoService,
    ReturnInfoPopupService,
    ReturnInfoComponent,
    ReturnInfoDetailComponent,
    ReturnInfoDialogComponent,
    ReturnInfoPopupComponent,
    ReturnInfoDeletePopupComponent,
    ReturnInfoDeleteDialogComponent,
    returnInfoRoute,
    returnInfoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...returnInfoRoute,
    ...returnInfoPopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReturnInfoComponent,
        ReturnInfoDetailComponent,
        ReturnInfoDialogComponent,
        ReturnInfoDeleteDialogComponent,
        ReturnInfoPopupComponent,
        ReturnInfoDeletePopupComponent,
    ],
    entryComponents: [
        ReturnInfoComponent,
        ReturnInfoDialogComponent,
        ReturnInfoPopupComponent,
        ReturnInfoDeleteDialogComponent,
        ReturnInfoDeletePopupComponent,
    ],
    providers: [
        ReturnInfoService,
        ReturnInfoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclReturnInfoModule {}
