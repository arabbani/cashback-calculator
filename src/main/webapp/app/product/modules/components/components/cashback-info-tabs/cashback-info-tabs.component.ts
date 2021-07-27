import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Iterable, List } from 'immutable';

import { CashbackInfo } from '../../../../model';

@Component({
  selector: 'apsstr-cashback-info-tabs',
  templateUrl: './cashback-info-tabs.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CashbackInfoTabsComponent implements OnChanges {

  @Input() cashbackInfos: List<CashbackInfo>;
  newUserOnlyCashbackInfos: Iterable<number, CashbackInfo>;
  allUserCashbackInfos: Iterable<number, CashbackInfo>;

  constructor() { }

  ngOnChanges() {
    this.extractNewUserOnlyOffers();
  }

  private extractNewUserOnlyOffers(): void {
    const groupedCashbackInfos = this.cashbackInfos.groupBy((cashbackInfo) => cashbackInfo.offer.newUserOnly);
    this.newUserOnlyCashbackInfos = groupedCashbackInfos.get(true);
    this.allUserCashbackInfos = groupedCashbackInfos.get(false);
  }

}
