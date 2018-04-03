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
          title: 'Prepaid and Postpaid Mobile Reecharge Coupons, Offers & Promo Codes, ',
          meta: {
            description: ''
          }
        }
      },
      {
        path: 'dth-reecharge-coupons',
        component: DthComponent,
        data: {
          title: 'DTH Reecharge Coupons, Offers & Promo Codes, ',
          meta: {
          }
        }
      },
      {
        path: 'datacard-reecharge-coupons',
        component: DatacardComponent,
        data: {
          title: 'Prepaid and Postpaid Datacard Reecharge Coupons, Offers & Promo Codes, ',
          meta: {
          }
        }
      },
      {
        path: 'broadband-reecharge-coupons',
        component: BroadbandComponent,
        data: {
          title: 'Broadband Reecharge Coupons, Offers & Promo Codes, ',
          meta: {
          }
        }
      },
      {
        path: 'landline-reecharge-coupons',
        component: LandlineComponent,
        data: {
          title: 'Landline Reecharge Coupons, Offers & Promo Codes, ',
          meta: {
          }
        }
      },
      {
        path: 'electricity-bill-payment-coupons',
        component: ElectricityComponent,
        data: {
          title: 'Electricity Bill Payment Coupons, Offers & Promo Codes, ',
          meta: {
          }
        }
      },
      {
        path: 'gas-bill-payment-coupons',
        component: GasComponent,
        data: {
          title: 'Gas Bill Payment Coupons, Offers & Promo Codes, ',
          meta: {
          }
        }
      },
      {
        path: 'metro-reecharge-coupons',
        component: MetroComponent,
        data: {
          title: 'Metro Reecharge Coupons, Offers & Promo Codes, ',
          meta: {
          }
        }
      },
      {
        path: 'water-bill-payment-coupons',
        component: WaterComponent,
        data: {
          title: 'Water Bill Payment Coupons, Offers & Promo Codes, ',
          meta: {
          }
        }
      },
      {
        path: 'flight-coupons',
        component: FlightComponent,
        data: {
          title: 'Flight Booking Coupons, Offers & Promo Codes, ',
          meta: {
          }
        }
      },
      {
        path: 'bus-coupons',
        component: BusComponent,
        data: {
          title: 'Bus Booking Coupons, Offers & Promo Codes, ',
          meta: {
          }
        }
      },
      {
        path: 'cab-coupons',
        component: CabComponent,
        data: {
          title: 'Cab Booking Coupons, Offers & Promo Codes, ',
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
