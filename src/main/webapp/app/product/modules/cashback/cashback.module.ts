import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BlockUIModule } from 'ng-block-ui';

import { ApsstrSharedModule } from '../../../apsstr-core-ui';
import { CashbackRoutingModule } from './cashback-routing.module';
import {
  BroadbandComponent,
  CashbackComponent,
  DatacardComponent,
  DthComponent,
  ElectricityComponent,
  FlightComponent,
  GasComponent,
  LandlineComponent,
  MetroComponent,
  MobileComponent,
  WaterComponent,
} from './components';
import { TooltipModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    CashbackRoutingModule,
    FormsModule,
    ApsstrSharedModule,
    BlockUIModule,
    NgSelectModule,
    TooltipModule.forRoot()
  ],
  declarations: [
    CashbackComponent, MobileComponent, DthComponent, DatacardComponent,
    LandlineComponent, ElectricityComponent, GasComponent, BroadbandComponent,
    WaterComponent, MetroComponent, FlightComponent
  ]
})
export class CashbackModule { }
