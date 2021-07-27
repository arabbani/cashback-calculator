import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';

import { CbclSharedModule } from '../../shared';
import { AffiliateComponent, affiliateRoute, AffiliateService } from './';

const ENTITY_STATES = [
    affiliateRoute
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
        AffiliateComponent
    ],
    entryComponents: [
        AffiliateComponent
    ],
    providers: [
        AffiliateService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclAffiliateModule {}
