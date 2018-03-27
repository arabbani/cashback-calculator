import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BlockUIModule } from 'ng-block-ui';
import { TooltipModule } from 'ngx-bootstrap';

import { ComponentsModule } from '../components';
import { ApsstrSharedModule } from '../../../apsstr-core-ui';
import { CashbackRoutingModule } from './cashback-routing.module';
import {
  BroadbandComponent,
  BusComponent,
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

@NgModule({
  imports: [
    CommonModule,
    CashbackRoutingModule,
    FormsModule,
    ApsstrSharedModule,
    BlockUIModule,
    NgSelectModule,
    TooltipModule.forRoot(),
    ComponentsModule
  ],
  declarations: [
    CashbackComponent, MobileComponent, DthComponent, DatacardComponent,
    LandlineComponent, ElectricityComponent, GasComponent, BroadbandComponent,
    WaterComponent, MetroComponent, FlightComponent, BusComponent
  ]
})
export class CashbackModule { }
