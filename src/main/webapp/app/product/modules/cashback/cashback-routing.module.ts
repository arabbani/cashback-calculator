import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CashbackComponent } from './components';

const routes: Routes = [
  {
    path: 'calculate',
    component: CashbackComponent,
    children: [
      // {
      //   path: 'mobile',
      //   component: MobileComponent
      // },
      // {
      //   path: 'dth',
      //   component: DthComponent
      // },
      // {
      //   path: 'datacard',
      //   component: DatacardComponent
      // },
      // {
      //   path: 'broadband',
      //   component: BroadbandComponent
      // },
      // {
      //   path: 'landline',
      //   component: LandlineComponent
      // },
      // {
      //   path: 'electricity',
      //   component: ElectricityComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashbackRoutingModule { }
