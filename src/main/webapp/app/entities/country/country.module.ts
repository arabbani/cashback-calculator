import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';

import { CbclSharedModule } from '../../shared';
import { CountryComponent, countryRoute, CountryService } from './';

const ENTITY_STATES = [
    countryRoute
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
        CountryComponent
    ],
    entryComponents: [
        CountryComponent
    ],
    providers: [
        CountryService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclCountryModule {}
