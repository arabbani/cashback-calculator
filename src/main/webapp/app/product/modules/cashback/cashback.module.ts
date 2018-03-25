import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BlockUIModule } from 'ng-block-ui';

import { ApsstrSharedModule } from '../../../apsstr-core-ui';
import { CashbackRoutingModule } from './cashback-routing.module';
import { CashbackComponent } from './components/cashback/cashback.component';
import { MobileComponent } from './components/mobile/mobile.component';
import { DthComponent } from './components/dth/dth.component';
import { DatacardComponent } from './components/datacard/datacard.component';

@NgModule({
  imports: [
    CommonModule,
    CashbackRoutingModule,
    FormsModule,
    ApsstrSharedModule,
    BlockUIModule,
    NgSelectModule
  ],
  declarations: [CashbackComponent, MobileComponent, DthComponent, DatacardComponent]
})
export class CashbackModule { }
