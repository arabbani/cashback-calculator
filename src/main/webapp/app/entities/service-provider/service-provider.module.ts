import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';

import { CbclSharedModule } from '../../shared';
import { ServiceProviderComponent, serviceProviderRoute, ServiceProviderService } from './';

const ENTITY_STATES = [
    serviceProviderRoute
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        ReactiveFormsModule,
        GridModule,
        DialogModule,
        NgSelectModule
    ],
    declarations: [
        ServiceProviderComponent
    ],
    entryComponents: [
        ServiceProviderComponent
    ],
    providers: [
        ServiceProviderService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclServiceProviderModule {}
