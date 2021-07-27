import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';

import { ApsstrSharedModule } from '../../apsstr-core-ui';
import { CbclSharedModule } from '../../shared';
import { StateComponent, stateRoute, StateService } from './';

const ENTITY_STATES = [
    stateRoute
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        ReactiveFormsModule,
        GridModule,
        DialogModule,
        DropDownListModule,
        ApsstrSharedModule
    ],
    declarations: [
        StateComponent
    ],
    entryComponents: [
        StateComponent
    ],
    providers: [
        StateService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclStateModule {}
