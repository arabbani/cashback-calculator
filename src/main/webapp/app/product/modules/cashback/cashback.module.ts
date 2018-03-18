import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ApsstrSharedModule } from '../../../apsstr-core-ui';
import { CashbackRoutingModule } from './cashback-routing.module';
import { CashbackComponent } from './components/cashback/cashback.component';
import { MobileComponent } from './components/mobile/mobile.component';

@NgModule({
  imports: [
    CommonModule,
    CashbackRoutingModule,
    FormsModule,
    ApsstrSharedModule
  ],
  declarations: [CashbackComponent, MobileComponent]
})
export class CashbackModule { }
