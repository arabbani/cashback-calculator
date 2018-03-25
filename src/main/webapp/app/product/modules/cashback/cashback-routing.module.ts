import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  BroadbandComponent,
  CashbackComponent,
  DatacardComponent,
  DthComponent,
  ElectricityComponent,
  GasComponent,
  LandlineComponent,
  MetroComponent,
  MobileComponent,
  WaterComponent,
} from './components';

const routes: Routes = [
  {
    path: 'cashback',
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashbackRoutingModule { }
