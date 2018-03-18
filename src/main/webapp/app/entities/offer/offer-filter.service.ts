import { Injectable } from '@angular/core';
import { List } from 'immutable';
import * as _ from 'lodash';

import { CashbackInfo } from '../../product';

@Injectable()
export class OfferFilterService {

  constructor() { }

  excludeDummyCashbackInfos(cashbackInfos: List<CashbackInfo>): List<CashbackInfo> {
    const notDummyOffer = cashbackInfos.filter((cashbackInfo) => {
      return cashbackInfo.dummy === false;
    });
    if (notDummyOffer) {
      return notDummyOffer.toList();
    }
  }

  filterCashbackInfoByMerchant(cashbackInfos: List<CashbackInfo>, merchants: Array<number>): List<CashbackInfo> {
    const filtered = cashbackInfos.filter((cashbackInfo) => {
      return _.includes(merchants, cashbackInfo.offer.merchant.id);
    });
    if (filtered) {
      return filtered.toList();
    }
  }

}
