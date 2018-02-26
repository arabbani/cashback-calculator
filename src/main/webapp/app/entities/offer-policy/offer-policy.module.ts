import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';

import { CbclSharedModule } from '../../shared';
import { OfferPolicyComponent, offerPolicyRoute, OfferPolicyService } from './';

const ENTITY_STATES = [
    offerPolicyRoute
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
        OfferPolicyComponent
    ],
    entryComponents: [
        OfferPolicyComponent
    ],
    providers: [
        OfferPolicyService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclOfferPolicyModule {}
