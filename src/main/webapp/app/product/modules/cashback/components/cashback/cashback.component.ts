import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { List } from 'immutable';
import * as _ from 'lodash';
import { BlockUIService } from 'ng-block-ui';
import { JhiEventManager } from 'ng-jhipster';
import { ISubscription } from 'rxjs/Subscription';

import { OfferFilterService } from '../../../../../entities/offer/offer-filter.service';
import { CashbackInfo, CompoundBenefit, StoredCashback } from '../../../../model';
import { StoredCashbackService } from '../../../product-core';

@Component({
    selector: 'apsstr-cashback',
    templateUrl: './cashback.component.html',
    styles: []
})
export class CashbackComponent implements OnInit, OnDestroy {

    cashbackInfos: List<CashbackInfo>;
    showDefault: boolean;
    showError: boolean;
    private calculateCashbackErrorEvent: ISubscription;
    private storedCashbackInfosEvent: ISubscription;
    private newCashbackInfosEvent: ISubscription;
    private navigationEndEvent: ISubscription;

    constructor(private router: Router, private jhiEventManager: JhiEventManager, private blockUIService: BlockUIService, private storedCashbackService: StoredCashbackService,
    private offerFilterService: OfferFilterService) {}

    ngOnInit() {
        this.showDefault = true;
        this.registerRouteChangeEvent();
        this.registerErrorEvent();
        this.registerNewCashbackInfosEvent();
        this.registerStoredCashbackInfosEvent();
    }

    ngOnDestroy() {
        this.storedCashbackInfosEvent.unsubscribe();
        this.newCashbackInfosEvent.unsubscribe();
        this.calculateCashbackErrorEvent.unsubscribe();
        this.navigationEndEvent.unsubscribe();
        this.blockUIService.stop('calculateCashback');
    }

    isExistCashbackInfos(): boolean {
        return this.cashbackInfos && this.cashbackInfos.size > 0;
    }

    private registerRouteChangeEvent(): void {
        this.navigationEndEvent = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.storedCashbackService.storeFromTemporaryStorage();
                this.cashbackInfos = undefined;
                this.showDefault = true;
                this.showError = false;
            }
        });
    }

    private registerErrorEvent(): void {
        this.calculateCashbackErrorEvent = this.jhiEventManager.subscribe('calculateCashbackError', (response) => {
            this.cashbackInfos = undefined;
            this.showDefault = false;
            this.showError = true;
        });
    }

    private registerStoredCashbackInfosEvent(): void {
        this.storedCashbackInfosEvent = this.jhiEventManager.subscribe('storedCashbackInfos', (response) => {
            this.blockUIService.stop('calculateCashback');
            this.onBroadcastCashbackInfos(<StoredCashback> response.content);
        });
    }

    private registerNewCashbackInfosEvent(): void {
        this.newCashbackInfosEvent = this.jhiEventManager.subscribe('newCashbackInfos', (response) => {
            this.blockUIService.stop('calculateCashback');
            this.onBroadcastCashbackInfos(<StoredCashback> response.content);
        });
    }

    private onBroadcastCashbackInfos(newCashbackInfo: StoredCashback): void {
        this.showDefault = false;
        this.showError = false;
        this.processCashbackInfos(_.cloneDeep(newCashbackInfo.cashbackInfos));
    }

    private processCashbackInfos(cashbackInfos: CashbackInfo[]): void {
        const length = cashbackInfos.length;
        for (let i = 0; i < length; i++) {
            cashbackInfos[i].offerBenefit.compoundBenefits = this.sortCompoundBenefits(cashbackInfos[i].offerBenefit.compoundBenefits);
        }
        this.cashbackInfos = this.offerFilterService.excludeDummyCashbackInfos(List(cashbackInfos));
    }

    private sortCompoundBenefits(compoundBenefits: CompoundBenefit[]): CompoundBenefit[] {
        return compoundBenefits.sort((compoundBenefitA, compoundBenefitB) => {
            const maximumReturnA = compoundBenefitA.maximumReturn;
            const maximumReturnB = compoundBenefitB.maximumReturn;
            if (maximumReturnA < maximumReturnB) {
                return 1;
            } else if (maximumReturnA > maximumReturnB) {
                return -1;
            }
            return 0;
        });
    }

}
