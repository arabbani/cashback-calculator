import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { List } from 'immutable';

import { CASHBACK_INFO_TAB_INCREMENT_SIZE, CASHBACK_INFO_TAB_VIEW_SIZE } from '../../../../constants';
import { CashbackInfo } from '../../../../model';

@Component({
  selector: 'apsstr-cashback-info-tab',
  templateUrl: './cashback-info-tab.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CashbackInfoTabComponent implements OnChanges {

  @Input() cashbackInfos: List<CashbackInfo>;
  @Input() heading: string;
  cashbackInfosToShow: List<CashbackInfo>;
  viewSize = CASHBACK_INFO_TAB_VIEW_SIZE;
  private incrementSize = CASHBACK_INFO_TAB_INCREMENT_SIZE;

  constructor() { }

  ngOnChanges() {
    if (this.cashbackInfos) {
      this.cashbackInfos = this.sortCashbackInfos(this.cashbackInfos);
      this.extractCashbackInfosToShow();
    }
  }

  private extractCashbackInfosToShow(): void {
    this.cashbackInfosToShow = this.cashbackInfos.take(this.viewSize).toList();
  }

  showMore(): void {
    this.viewSize += this.incrementSize;
    this.extractCashbackInfosToShow();
  }

  private sortCashbackInfos(cashbackInfos: List<CashbackInfo>): List<CashbackInfo> {
    const result = cashbackInfos.sort((cashbackInfoA, cashbackInfoB) => {
      const maximumReturnA = cashbackInfoA.offerBenefit.compoundBenefits[0].maximumReturn;
      const maximumReturnB = cashbackInfoB.offerBenefit.compoundBenefits[0].maximumReturn;
      if (maximumReturnA < maximumReturnB) {
        return 1;
      } else if (maximumReturnA > maximumReturnB) {
        return -1;
      }
      return 0;
    });
    return result.toList();
  }

}
