import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { List } from 'immutable';
import { BlockUIService } from 'ng-block-ui';
import { JhiEventManager } from 'ng-jhipster';
import { ISubscription } from 'rxjs/Subscription';
import { setTimeout } from 'timers';

import { CashbackInfo } from '../../../..';

@Component({
  selector: 'apsstr-cashback-info',
  templateUrl: './cashback-info.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CashbackInfoComponent implements OnInit, OnChanges, OnDestroy {

  @Input() cashbackInfos: List<CashbackInfo>;
  @Input() subCategoryCode: string;
  filteredCashbackInfos: List<CashbackInfo>;
  private onFilterCashbackInfosEvent: ISubscription;

  constructor(private jhiEventManager: JhiEventManager, private blockUIService: BlockUIService) { }

  ngOnInit() {
    this.registerOnFilterCashbackInfosEvent();
  }

  ngOnChanges() {
    this.filteredCashbackInfos = this.cashbackInfos;
  }

  ngOnDestroy() {
    this.onFilterCashbackInfosEvent.unsubscribe();
  }

  registerOnFilterCashbackInfosEvent(): void {
    this.onFilterCashbackInfosEvent = this.jhiEventManager.subscribe('onFilterCashbackInfos', (response) => {
      setTimeout(() => {
        this.filteredCashbackInfos = response.content;
        this.blockUIService.stop('calculateCashback');
      }, 500);
    });
  }

}
