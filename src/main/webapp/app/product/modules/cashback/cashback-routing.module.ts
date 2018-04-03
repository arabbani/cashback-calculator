import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import {
  BroadbandComponent,
  BusComponent,
  CabComponent,
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
    path: '',
    component: CashbackComponent,
    canActivateChild: [MetaGuard],
    children: [
      {
        path: 'mobile-reecharge-coupons',
        component: MobileComponent,
        data: {
          title: 'Prepaid and Postpaid Mobile Reecharge Offers, Deals, Coupons | ',
          meta: {
            description: ''
          }
        }
      },
      {
        path: 'dth-reecharge-coupons',
        component: DthComponent,
        data: {
          title: 'Dth Reecharge Offers, Deals, Coupons | ',
          meta: {
          }
        }
      },
      {
        path: 'datacard-reecharge-coupons',
        component: DatacardComponent,
        data: {
          title: 'Prepaid and Postpaid Datacard Reecharge Offers, Deals, Coupons | ',
          meta: {
          }
        }
      },
      {
        path: 'broadband-reecharge-coupons',
        component: BroadbandComponent,
        data: {
          title: 'Broadband Reecharge Offers, Deals, Coupons | ',
          meta: {
          }
        }
      },
      {
        path: 'landline-reecharge-coupons',
        component: LandlineComponent,
        data: {
          title: 'Landline Reecharge Offers, Deals, Coupons | ',
          meta: {
          }
        }
      },
      {
        path: 'electricity-bill-payment-coupons',
        component: ElectricityComponent,
        data: {
          title: 'Electricity Bill Payment Offers, Deals, Coupons | ',
          meta: {
          }
        }
      },
      {
        path: 'gas-bill-payment-coupons',
        component: GasComponent,
        data: {
          title: 'Gas Bill Payment Offers, Deals, Coupons | ',
          meta: {
          }
        }
      },
      {
        path: 'metro-reecharge-coupons',
        component: MetroComponent,
        data: {
          title: 'Metro Reecharge Offers, Deals, Coupons | ',
          meta: {
          }
        }
      },
      {
        path: 'water-bill-payment-coupons',
        component: WaterComponent,
        data: {
          title: 'Water Bill Payment Offers, Deals, Coupons | ',
          meta: {
          }
        }
      },
      {
        path: 'flight-coupons',
        component: FlightComponent,
        data: {
          title: 'Flight Booking Offers, Deals, Coupons | ',
          meta: {
          }
        }
      },
      {
        path: 'bus-coupons',
        component: BusComponent,
        data: {
          title: 'Bus Offers, Deals, Coupons | ',
          meta: {
          }
        }
      },
      {
        path: 'cab-coupons',
        component: CabComponent,
        data: {
          title: 'Cab Offers, Deals, Coupons | ',
          meta: {
          }
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashbackRoutingModule { }
