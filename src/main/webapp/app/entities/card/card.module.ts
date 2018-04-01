import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';

import { CbclSharedModule } from '../../shared';
import { CardComponent, cardRoute, CardService } from './';

const ENTITY_STATES = [
    cardRoute
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
        CardComponent
    ],
    entryComponents: [
        CardComponent
    ],
    providers: [
        CardService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclCardModule {}
