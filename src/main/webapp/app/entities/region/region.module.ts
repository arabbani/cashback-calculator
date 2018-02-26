import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';

import { CbclSharedModule } from '../../shared';
import {
    RegionService,
    RegionComponent,
    regionRoute
} from './';

const ENTITY_STATES = [
    regionRoute
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
        RegionComponent
    ],
    entryComponents: [
        RegionComponent
    ],
    providers: [
        RegionService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclRegionModule {}
