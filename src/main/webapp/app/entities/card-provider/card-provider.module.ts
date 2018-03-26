import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    CardProviderService,
    CardProviderPopupService,
    CardProviderComponent,
    CardProviderDetailComponent,
    CardProviderDialogComponent,
    CardProviderPopupComponent,
    CardProviderDeletePopupComponent,
    CardProviderDeleteDialogComponent,
    cardProviderRoute,
    cardProviderPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cardProviderRoute,
    ...cardProviderPopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CardProviderComponent,
        CardProviderDetailComponent,
        CardProviderDialogComponent,
        CardProviderDeleteDialogComponent,
        CardProviderPopupComponent,
        CardProviderDeletePopupComponent,
    ],
    entryComponents: [
        CardProviderComponent,
        CardProviderDialogComponent,
        CardProviderPopupComponent,
        CardProviderDeleteDialogComponent,
        CardProviderDeletePopupComponent,
    ],
    providers: [
        CardProviderService,
        CardProviderPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclCardProviderModule {}
