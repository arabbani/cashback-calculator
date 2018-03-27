import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';

import { ApsstrSharedModule } from '../../../apsstr-core-ui';
import {
  CashbackInfoCardComponent,
  CashbackInfoComponent,
  CashbackInfoTabComponent,
  CashbackInfoTabsComponent,
  OfferCardsComponent,
  OfferNotFoundComponent,
  ServerErrorComponent,
  SiteStoryComponent,
} from './components';

const DECLARABLES = [
  OfferNotFoundComponent, ServerErrorComponent, SiteStoryComponent,
  CashbackInfoComponent, CashbackInfoCardComponent, CashbackInfoTabComponent,
  CashbackInfoTabsComponent, OfferCardsComponent
];

@NgModule({
  imports: [
    CommonModule,
    ApsstrSharedModule,
    FormsModule,
    TabsModule.forRoot(),
    ClipboardModule
  ],
  declarations: DECLARABLES,
  exports: DECLARABLES
})
export class ComponentsModule { }
