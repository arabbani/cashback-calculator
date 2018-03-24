import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DropDownListModule, MultiSelectModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { SwitchModule } from '@progress/kendo-angular-inputs';
import { MomentModule } from 'angular2-moment';
import { BsDatepickerModule, TabsModule, TimepickerModule } from 'ngx-bootstrap';

import { CbclSharedModule } from '../../shared';
import { OfferComponent, OfferFilterService, offerRoute, OfferService } from './';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { OfferResolver } from './offer-resolver.service';

const ENTITY_STATES = offerRoute;

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        GridModule,
        DialogModule,
        MomentModule,
        TabsModule.forRoot(),
        DropDownListModule,
        SwitchModule,
        MultiSelectModule,
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        NgSelectModule
    ],
    declarations: [
        OfferComponent,
        CreateOfferComponent,
    ],
    entryComponents: [
        OfferComponent,
    ],
    providers: [
        OfferService,
        OfferResolver,
        OfferFilterService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclOfferModule { }
