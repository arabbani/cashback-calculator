import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';

import { CbclSharedModule } from '../../shared';
import { RechargePlanTypeComponent, rechargePlanTypeRoute, RechargePlanTypeService } from './';

const ENTITY_STATES = [
    rechargePlanTypeRoute
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
        RechargePlanTypeComponent
    ],
    entryComponents: [
        RechargePlanTypeComponent
    ],
    providers: [
        RechargePlanTypeService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclRechargePlanTypeModule {}
