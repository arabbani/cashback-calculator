import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    CardTypeService,
    CardTypePopupService,
    CardTypeComponent,
    CardTypeDetailComponent,
    CardTypeDialogComponent,
    CardTypePopupComponent,
    CardTypeDeletePopupComponent,
    CardTypeDeleteDialogComponent,
    cardTypeRoute,
    cardTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...cardTypeRoute,
    ...cardTypePopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CardTypeComponent,
        CardTypeDetailComponent,
        CardTypeDialogComponent,
        CardTypeDeleteDialogComponent,
        CardTypePopupComponent,
        CardTypeDeletePopupComponent,
    ],
    entryComponents: [
        CardTypeComponent,
        CardTypeDialogComponent,
        CardTypePopupComponent,
        CardTypeDeleteDialogComponent,
        CardTypeDeletePopupComponent,
    ],
    providers: [
        CardTypeService,
        CardTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclCardTypeModule {}
