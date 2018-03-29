import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    OperatingSystemService,
    OperatingSystemPopupService,
    OperatingSystemComponent,
    OperatingSystemDetailComponent,
    OperatingSystemDialogComponent,
    OperatingSystemPopupComponent,
    OperatingSystemDeletePopupComponent,
    OperatingSystemDeleteDialogComponent,
    operatingSystemRoute,
    operatingSystemPopupRoute,
} from './';

const ENTITY_STATES = [
    ...operatingSystemRoute,
    ...operatingSystemPopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OperatingSystemComponent,
        OperatingSystemDetailComponent,
        OperatingSystemDialogComponent,
        OperatingSystemDeleteDialogComponent,
        OperatingSystemPopupComponent,
        OperatingSystemDeletePopupComponent,
    ],
    entryComponents: [
        OperatingSystemComponent,
        OperatingSystemDialogComponent,
        OperatingSystemPopupComponent,
        OperatingSystemDeleteDialogComponent,
        OperatingSystemDeletePopupComponent,
    ],
    providers: [
        OperatingSystemService,
        OperatingSystemPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclOperatingSystemModule {}
