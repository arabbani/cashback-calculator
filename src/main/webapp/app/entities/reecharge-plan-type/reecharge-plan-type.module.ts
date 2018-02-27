import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';

import { CbclSharedModule } from '../../shared';
import { ReechargePlanTypeComponent, reechargePlanTypeRoute, ReechargePlanTypeService } from './';

const ENTITY_STATES = [
    reechargePlanTypeRoute
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        ReactiveFormsModule,
        GridModule,
        DialogModule
    ],
    declarations: [
        ReechargePlanTypeComponent
    ],
    entryComponents: [
        ReechargePlanTypeComponent
    ],
    providers: [
        ReechargePlanTypeService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclReechargePlanTypeModule {}
