import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BlockUIModule } from 'ng-block-ui';
import { TooltipModule } from 'ngx-bootstrap';

import { ApsstrSharedModule } from '../../../apsstr-core-ui';
import { ComponentsModule } from '../components';
import { CashbackRoutingModule } from './cashback-routing.module';
import {
  BroadbandComponent,
  BusComponent,
  CabComponent,
  CarRentalComponent,
  CashbackComponent,
  DatacardComponent,
  DthComponent,
  ElectricityComponent,
  FlightComponent,
  GasComponent,
  HotelComponent,
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
    WaterComponent, MetroComponent, FlightComponent, BusComponent, CabComponent,
    CarRentalComponent,
    HotelComponent
  ]
})
export class CashbackModule { }
