import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    ElectronicsInfoService,
    ElectronicsInfoPopupService,
    ElectronicsInfoComponent,
    ElectronicsInfoDetailComponent,
    ElectronicsInfoDialogComponent,
    ElectronicsInfoPopupComponent,
    ElectronicsInfoDeletePopupComponent,
    ElectronicsInfoDeleteDialogComponent,
    electronicsInfoRoute,
    electronicsInfoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...electronicsInfoRoute,
    ...electronicsInfoPopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ElectronicsInfoComponent,
        ElectronicsInfoDetailComponent,
        ElectronicsInfoDialogComponent,
        ElectronicsInfoDeleteDialogComponent,
        ElectronicsInfoPopupComponent,
        ElectronicsInfoDeletePopupComponent,
    ],
    entryComponents: [
        ElectronicsInfoComponent,
        ElectronicsInfoDialogComponent,
        ElectronicsInfoPopupComponent,
        ElectronicsInfoDeleteDialogComponent,
        ElectronicsInfoDeletePopupComponent,
    ],
    providers: [
        ElectronicsInfoService,
        ElectronicsInfoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclElectronicsInfoModule {}
