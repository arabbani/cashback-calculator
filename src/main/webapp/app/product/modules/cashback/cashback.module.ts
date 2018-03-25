import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BlockUIModule } from 'ng-block-ui';

import { ApsstrSharedModule } from '../../../apsstr-core-ui';
import { CashbackRoutingModule } from './cashback-routing.module';
import { BroadbandComponent } from './components/broadband/broadband.component';
import { CashbackComponent } from './components/cashback/cashback.component';
import { DatacardComponent } from './components/datacard/datacard.component';
import { DthComponent } from './components/dth/dth.component';
import { ElectricityComponent } from './components/electricity/electricity.component';
import { GasComponent } from './components/gas/gas.component';
import { LandlineComponent } from './components/landline/landline.component';
import { MetroComponent } from './components/metro/metro.component';
import { MobileComponent } from './components/mobile/mobile.component';
import { WaterComponent } from './components/water/water.component';

@NgModule({
  imports: [
    CommonModule,
    CashbackRoutingModule,
    FormsModule,
    ApsstrSharedModule,
    BlockUIModule,
    NgSelectModule
  ],
  declarations: [
    CashbackComponent, MobileComponent, DthComponent, DatacardComponent,
    LandlineComponent, ElectricityComponent, GasComponent, BroadbandComponent,
    WaterComponent, MetroComponent
  ]
})
export class CashbackModule { }
