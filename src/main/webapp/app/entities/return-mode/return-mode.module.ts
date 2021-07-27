import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';

import { CbclSharedModule } from '../../shared';
import { ReturnModeComponent, returnModeRoute, ReturnModeService } from './';

const ENTITY_STATES = [
    returnModeRoute
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
        ReturnModeComponent
    ],
    entryComponents: [
        ReturnModeComponent
    ],
    providers: [
        ReturnModeService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclReturnModeModule {}
