import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    ReechargeInfoService,
    ReechargeInfoPopupService,
    ReechargeInfoComponent,
    ReechargeInfoDetailComponent,
    ReechargeInfoDialogComponent,
    ReechargeInfoPopupComponent,
    ReechargeInfoDeletePopupComponent,
    ReechargeInfoDeleteDialogComponent,
    reechargeInfoRoute,
    reechargeInfoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...reechargeInfoRoute,
    ...reechargeInfoPopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReechargeInfoComponent,
        ReechargeInfoDetailComponent,
        ReechargeInfoDialogComponent,
        ReechargeInfoDeleteDialogComponent,
        ReechargeInfoPopupComponent,
        ReechargeInfoDeletePopupComponent,
    ],
    entryComponents: [
        ReechargeInfoComponent,
        ReechargeInfoDialogComponent,
        ReechargeInfoPopupComponent,
        ReechargeInfoDeleteDialogComponent,
        ReechargeInfoDeletePopupComponent,
    ],
    providers: [
        ReechargeInfoService,
        ReechargeInfoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclReechargeInfoModule {}
