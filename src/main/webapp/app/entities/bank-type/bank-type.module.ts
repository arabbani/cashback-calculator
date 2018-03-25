import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    BankTypeService,
    BankTypePopupService,
    BankTypeComponent,
    BankTypeDetailComponent,
    BankTypeDialogComponent,
    BankTypePopupComponent,
    BankTypeDeletePopupComponent,
    BankTypeDeleteDialogComponent,
    bankTypeRoute,
    bankTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...bankTypeRoute,
    ...bankTypePopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BankTypeComponent,
        BankTypeDetailComponent,
        BankTypeDialogComponent,
        BankTypeDeleteDialogComponent,
        BankTypePopupComponent,
        BankTypeDeletePopupComponent,
    ],
    entryComponents: [
        BankTypeComponent,
        BankTypeDialogComponent,
        BankTypePopupComponent,
        BankTypeDeleteDialogComponent,
        BankTypeDeletePopupComponent,
    ],
    providers: [
        BankTypeService,
        BankTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclBankTypeModule {}
