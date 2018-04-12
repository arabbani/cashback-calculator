import { Component, Input, OnChanges } from '@angular/core';
import { List } from 'immutable';
import * as _ from 'lodash';
import { BlockUIService } from 'ng-block-ui';
import { JhiEventManager } from 'ng-jhipster';

import { SelectableService } from '../../../../../apsstr-core-ui';
import { Merchant } from '../../../../../entities';
import { OfferFilterService } from '../../../../../entities/offer/offer-filter.service';
import { CashbackInfo, OfferFilterInput } from '../../../../model';

@Component({
  selector: 'apsstr-offer-filter',
  templateUrl: './offer-filter.component.html',
  styles: []
})
export class OfferFilterComponent implements OnChanges {

  @Input() private cashbackInfos: List<CashbackInfo>;
  private filteredCashback: List<CashbackInfo>;
  merchants: Merchant[];
  filterInput: OfferFilterInput;
  isCollapsed = true;

  constructor(private offerFilterService: OfferFilterService, private selectableService: SelectableService, private blockUIService: BlockUIService,
    private jhiEventManager: JhiEventManager) { }

  ngOnChanges() {
    this.initializeFilterInput();
    this.extractFilterEntities();
  }

  private initializeFilterInput(): void {
    this.filterInput = new OfferFilterInput();
  }

  private extractFilterEntities(): void {
    const cashbackInfos = this.cashbackInfos.toJS();
    const merchantSet = new Set();
    _.forEach(cashbackInfos, (cashbackInfo) => {
      const offer = cashbackInfo.offer;
      merchantSet.add(offer.merchant);
    });
    this.merchants = _.toArray(merchantSet);
  }

  filter(): void {
    this.blockUI();
    this.initializeFilteredCashbackInfos();
    this.filterMerchant();
    this.broadcastFilteredCashbackInfos();
  }

  resetFilter(): void {
    this.blockUI();
    this.initializeFilterInput();
    this.initializeFilteredCashbackInfos();
    this.broadcastFilteredCashbackInfos();
  }

  private broadcastFilteredCashbackInfos(): void {
    this.jhiEventManager.broadcast({
      name: 'onFilterCashbackInfos',
      content: this.filteredCashback
    });
  }

  private blockUI(): void {
    this.blockUIService.start('calculateCashback');
  }

  private initializeFilteredCashbackInfos(): void {
    this.filteredCashback = this.cashbackInfos;
  }

  private filterMerchant(): void {
    if (this.filterInput.merchants.length > 0) {
      this.filteredCashback = this.offerFilterService.filterCashbackInfoByMerchant(this.filteredCashback, this.filterInput.merchants);
    }
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

}
