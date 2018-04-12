import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BlockUIModule } from 'ng-block-ui';
import { CollapseModule, TabsModule } from 'ngx-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';

import { ApsstrSharedModule } from '../../../apsstr-core-ui';
import {
  CashbackInfoCardComponent,
  CashbackInfoComponent,
  CashbackInfoTabComponent,
  CashbackInfoTabsComponent,
  OfferCardsComponent,
  OfferFilterComponent,
  OfferNotFoundComponent,
  ServerErrorComponent,
  SiteStoryComponent,
} from './components';

const DECLARABLES = [
  OfferNotFoundComponent, ServerErrorComponent, SiteStoryComponent,
  CashbackInfoComponent, CashbackInfoCardComponent, CashbackInfoTabComponent,
  CashbackInfoTabsComponent, OfferCardsComponent, OfferFilterComponent
];

@NgModule({
  imports: [
    CommonModule,
    ApsstrSharedModule,
    FormsModule,
    TabsModule.forRoot(),
    ClipboardModule,
    NgSelectModule,
    CollapseModule.forRoot(),
    BlockUIModule
  ],
  declarations: DECLARABLES,
  exports: DECLARABLES
})
export class ComponentsModule { }
