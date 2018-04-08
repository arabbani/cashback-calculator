import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import * as moment from 'moment';

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
  LandlineComponent,
  MetroComponent,
  MobileComponent,
  WaterComponent,
} from './components';

const dateTime = moment();
const date = moment(dateTime).format('MMM') + ' ' + dateTime.year();

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
          title: `Mobile Recharge Coupons, Offers for ${date}`,
          meta: {
            // tslint:disable-next-line:max-line-length
            description: `Get discounts on Mobile recharge with latest coupons, offers, promo codes for ${date} in India. Save more with the best Mobile Recharge offers in only one click.`
          }
        }
      },
      {
        path: 'dth-recharge-coupons',
        component: DthComponent,
        data: {
          title: `DTH Recharge Offers & Coupons, ${date}`,
          meta: {
            // tslint:disable-next-line:max-line-length
            description: `Save more with latest DTH recharge offers, coupons ${date} in India with only one click. Get discount with best DTH Recharge coupons, promo codes that 100% works.`
          }
        }
      },
      {
        path: 'datacard-recharge-coupons',
        component: DatacardComponent,
        data: {
          title: `Datacard Recharge Coupons, Offers | ${date}`,
          meta: {
            // tslint:disable-next-line:max-line-length
            description: `Find latest Datacard recharge coupons, offers & promo codes for ${date} that 100% works in India with only one click. Use the best Datacard Recharge copuon, offer to get maximum discount and save more.`
          }
        }
      },
      {
        path: 'broadband-recharge-coupons',
        component: BroadbandComponent,
        data: {
          title: `Broadband Recharge Coupons & Offers, ${date}`,
          meta: {
            // tslint:disable-next-line:max-line-length
            description: `Get discount on Broadband recharge with latest coupons & offers ${date}. Use the best Broadband Recharge coupon, promo code that 100% works in India with only one click and save more.`
          }
        }
      },
      {
        path: 'landline-recharge-coupons',
        component: LandlineComponent,
        data: {
          title: `Landline Recharge Offers & Coupons ${date}`,
          meta: {
            // tslint:disable-next-line:max-line-length
            description: `Latest Landline recharge coupons, promo codes, offers for ${date} to use in India with only one click and get great discounts. Use Landline Recharge coupons, offers that 100% works.`
          }
        }
      },
      {
        path: 'electricity-bill-payment-coupons',
        component: ElectricityComponent,
        data: {
          title: `Electricity Bill Payment Offers, Coupons | ${date}`,
          meta: {
            // tslint:disable-next-line:max-line-length
            description: `Best Electricity Bill Payment coupons & offers ${date} in India with only one click. Save more with the latest Electricity Bill Payment coupon, promo codes & offer.`
          }
        }
      },
      {
        path: 'gas-bill-payment-coupons',
        component: GasComponent,
        data: {
          title: `Gas Bill Payment Offers & Coupons for ${date}`,
          meta: {
            description: `Best Gas Bill Payment promo codes, coupons, offers for ${date} that 100% works in India with only one click and save more.`
          }
        }
      },
      {
        path: 'metro-recharge-coupons',
        component: MetroComponent,
        data: {
          title: `Metro Recharge Offers, Coupons ${date}`,
          meta: {
            // tslint:disable-next-line:max-line-length
            description: `Latest Metro Recharge coupons & promo codes for ${date} in India with only one click and save more. Use the best Metro Recharge offer and get maximum discount.`
          }
        }
      },
      {
        path: 'water-bill-payment-coupons',
        component: WaterComponent,
        data: {
          title: `Water Bill Payment Coupons, Offers ${date}`,
          meta: {
            description: `Best Water Bill Payment promo codes, offers & coupons ${date} in India with only one click and save more.`
          }
        }
      },
      {
        path: 'flight-coupons',
        component: FlightComponent,
        data: {
          title: `Flight Coupons & Offers ${date}`,
          meta: {
            // tslint:disable-next-line:max-line-length
            description: `Find best Flight offers, coupons & promo codes for ${date} in India with only one click. Get maximum discount with coupons & offers that works 100% and save more.`
          }
        }
      },
      {
        path: 'bus-coupons',
        component: BusComponent,
        data: {
          title: `Bus Offers & Coupons | ${date}`,
          meta: {
            description: `Find best Bus offers & coupons ${date} in India that 100% works with only one click. Save more with latest Flight offers, promo codes.`
          }
        }
      },
      {
        path: 'cab-coupons',
        component: CabComponent,
        data: {
          title: `Cab Offers, Coupons for ${date}`,
          meta: {
            description: `Use Latest Cab coupons, offers, promo codes in India for ${date} & get great discount. Save more with the best coupon with only one click.`
          }
        }
      },
      {
        path: 'car-rental-coupons',
        component: CarRentalComponent,
        data: {
          title: `Car Rental Coupons, Offers for ${date}`,
          meta: {
            // tslint:disable-next-line:max-line-length
            description: `Save big with best Car Rental coupons & offers that 100% works in India ${date}. Find the best Car Rental offer, coupon,  promo code with only one click and get great discount.`
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
