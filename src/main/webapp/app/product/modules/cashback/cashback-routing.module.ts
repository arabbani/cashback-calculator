import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

const routes: Routes = [
  {
    path: 'reecharge',
    component: CashbackComponent,
    children: [
      {
        path: 'mobile',
        component: MobileComponent
      },
      {
        path: 'dth',
        component: DthComponent
      },
      {
        path: 'datacard',
        component: DatacardComponent
      },
      {
        path: 'broadband',
        component: BroadbandComponent
      },
      {
        path: 'landline',
        component: LandlineComponent
      },
      {
        path: 'electricity',
        component: ElectricityComponent
      },
      {
        path: 'gas',
        component: GasComponent
      },
      {
        path: 'metro',
        component: MetroComponent
      },
      {
        path: 'water',
        component: WaterComponent
      }
    ]
  },
  {
    path: 'travel',
    component: CashbackComponent,
    children: [
      {
        path: 'flight',
        component: FlightComponent
      },
      {
        path: 'bus',
        component: BusComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashbackRoutingModule { }
