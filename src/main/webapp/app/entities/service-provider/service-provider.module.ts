import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    ServiceProviderService,
    ServiceProviderPopupService,
    ServiceProviderComponent,
    ServiceProviderDetailComponent,
    ServiceProviderDialogComponent,
    ServiceProviderPopupComponent,
    ServiceProviderDeletePopupComponent,
    ServiceProviderDeleteDialogComponent,
    serviceProviderRoute,
    serviceProviderPopupRoute,
} from './';

const ENTITY_STATES = [
    ...serviceProviderRoute,
    ...serviceProviderPopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ServiceProviderComponent,
        ServiceProviderDetailComponent,
        ServiceProviderDialogComponent,
        ServiceProviderDeleteDialogComponent,
        ServiceProviderPopupComponent,
        ServiceProviderDeletePopupComponent,
    ],
    entryComponents: [
        ServiceProviderComponent,
        ServiceProviderDialogComponent,
        ServiceProviderPopupComponent,
        ServiceProviderDeleteDialogComponent,
        ServiceProviderDeletePopupComponent,
    ],
    providers: [
        ServiceProviderService,
        ServiceProviderPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclServiceProviderModule {}
