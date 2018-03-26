import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OfferReturn } from './offer-return.model';
import { OfferReturnService } from './offer-return.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-offer-return',
    templateUrl: './offer-return.component.html'
})
export class OfferReturnComponent implements OnInit, OnDestroy {
offerReturns: OfferReturn[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private offerReturnService: OfferReturnService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.offerReturnService.query().subscribe(
            (res: HttpResponse<OfferReturn[]>) => {
                this.offerReturns = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOfferReturns();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OfferReturn) {
        return item.id;
    }
    registerChangeInOfferReturns() {
        this.eventSubscriber = this.eventManager.subscribe('offerReturnListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
