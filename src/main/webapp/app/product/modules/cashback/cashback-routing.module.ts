import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import * as moment from 'moment';

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


const dateTime = moment();

const routes: Routes = [
  {
    path: '',
    component: CashbackComponent,
    canActivateChild: [MetaGuard],
    children: [
      {
        path: 'mobile-recharge-coupons',
        component: MobileComponent,
        data: {
          title: `Mobile Recharge Coupons, Offers for ${moment(dateTime).format('MMM') + ' ' + dateTime.year()}`,
          meta: {
            description: `Best Mobile recharge coupons, offers, promo codes for ${moment(dateTime).format('MMM') + ' ' + dateTime.year()} in India with only one click and save more.`
          }
        }
      },
      {
        path: 'dth-recharge-coupons',
        component: DthComponent,
        data: {
          title: `DTH Recharge Offers & Coupons, ${moment(dateTime).format('MMM') + ' ' + dateTime.year()}`,
          meta: {
            description: `Best DTH recharge offers, coupons, promo codes ${moment(dateTime).format('MMM') + ' ' + dateTime.year()} in India with only one click and save more.`
          }
        }
      },
      {
        path: 'datacard-recharge-coupons',
        component: DatacardComponent,
        data: {
          title: `Datacard Recharge Coupons, Offers | ${moment(dateTime).format('MMM') + ' ' + dateTime.year()}`,
          meta: {
            description: `Best Datacard recharge coupons, offers & promo codes for ${moment(dateTime).format('MMM') + ' ' + dateTime.year()} in India with only one click and save more.`
          }
        }
      },
      {
        path: 'broadband-recharge-coupons',
        component: BroadbandComponent,
        data: {
          title: `Broadband Recharge Coupons & Offers, ${moment(dateTime).format('MMM') + ' ' + dateTime.year()}`,
          meta: {
            description: `Best Broadband recharge coupons, offers & promo codes ${moment(dateTime).format('MMM') + ' ' + dateTime.year()} in India with only one click and save more.`
          }
        }
      },
      {
        path: 'landline-recharge-coupons',
        component: LandlineComponent,
        data: {
          title: `Landline Recharge Offers & Coupons ${moment(dateTime).format('MMM') + ' ' + dateTime.year()}`,
          meta: {
            description: `Best Landline recharge coupons, promo codes, offers for ${moment(dateTime).format('MMM') + ' ' + dateTime.year()} in India with only one click and save more.`
          }
        }
      },
      {
        path: 'electricity-bill-payment-coupons',
        component: ElectricityComponent,
        data: {
          title: `Electricity Bill Payment Offers, Coupons | ${moment(dateTime).format('MMM') + ' ' + dateTime.year()}`,
          meta: {
            description: `Best Electricity Bill Payment coupons, offers, promo codes ${moment(dateTime).format('MMM') + ' ' + dateTime.year()} in India with only one click and save more.`
          }
        }
      },
      {
        path: 'gas-bill-payment-coupons',
        component: GasComponent,
        data: {
          title: `Gas Bill Payment Offers & Coupons for ${moment(dateTime).format('MMM') + ' ' + dateTime.year()}`,
          meta: {
            description: `Best Gas Bill Payment promo codes, coupons, offers for ${moment(dateTime).format('MMM') + ' ' + dateTime.year()} in India with only one click and save more.`
          }
        }
      },
      {
        path: 'metro-recharge-coupons',
        component: MetroComponent,
        data: {
          title: `Metro Recharge Offers, Coupons ${moment(dateTime).format('MMM') + ' ' + dateTime.year()}`,
          meta: {
            description: `Best Metro Recharge coupons, offers & promo codes for ${moment(dateTime).format('MMM') + ' ' + dateTime.year()} in India with only one click and save more.`
          }
        }
      },
      {
        path: 'water-bill-payment-coupons',
        component: WaterComponent,
        data: {
          title: `Water Bill Payment Coupons, Offers ${moment(dateTime).format('MMM') + ' ' + dateTime.year()}`,
          meta: {
            description: `Best Water Bill Payment promo codes, offers & coupons ${moment(dateTime).format('MMM') + ' ' + dateTime.year()} in India with only one click and save more.`
          }
        }
      },
      {
        path: 'flight-coupons',
        component: FlightComponent,
        data: {
          title: `Mobile Recharge Coupons & Offers ${moment(dateTime).format('MMM') + ' ' + dateTime.year()}`,
          meta: {
            description: `Best Flight offers, coupons & promo codes for ${moment(dateTime).format('MMM') + ' ' + dateTime.year()} in India with only one click and save more.`
          }
        }
      },
      {
        path: 'bus-coupons',
        component: BusComponent,
        data: {
          title: `Mobile Recharge Offers & Coupons | ${moment(dateTime).format('MMM') + ' ' + dateTime.year()}`,
          meta: {
            description: `Best Bus offers, coupons & promo codes ${moment(dateTime).format('MMM') + ' ' + dateTime.year()} in India with only one click and save more.`
          }
        }
      },
      {
        path: 'cab-coupons',
        component: CabComponent,
        data: {
          title: `Mobile Recharge Offers, Coupons for ${moment(dateTime).format('MMM') + ' ' + dateTime.year()}`,
          meta: {
            description: `Best Cab coupons, offers, promo codes in India for ${moment(dateTime).format('MMM') + ' ' + dateTime.year()} with only one click and save more.`
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
