import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';

import { CbclSharedModule } from '../../shared';
import { CircleComponent, circleRoute, CircleService } from './';

const ENTITY_STATES = [
    circleRoute
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
        CircleComponent
    ],
    entryComponents: [
        CircleComponent
    ],
    providers: [
        CircleService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclCircleModule {}
