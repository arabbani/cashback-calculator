import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';

import { CbclSharedModule } from '../../shared';
import { SubCategoryComponent, subCategoryRoute, SubCategoryService } from './';

const ENTITY_STATES = [
    subCategoryRoute
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
        SubCategoryComponent
    ],
    entryComponents: [
        SubCategoryComponent
    ],
    providers: [
        SubCategoryService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclSubCategoryModule {}
