import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';

import { CbclSharedModule } from '../../shared';
import { CityComponent, cityRoute, CityService } from './';

const ENTITY_STATES = [
    cityRoute
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
        CityComponent
    ],
    entryComponents: [
        CityComponent
    ],
    providers: [
        CityService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclCityModule {}
