import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OfferPayment } from './offer-payment.model';
import { OfferPaymentService } from './offer-payment.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-offer-payment',
    templateUrl: './offer-payment.component.html'
})
export class OfferPaymentComponent implements OnInit, OnDestroy {
offerPayments: OfferPayment[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private offerPaymentService: OfferPaymentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.offerPaymentService.query().subscribe(
            (res: HttpResponse<OfferPayment[]>) => {
                this.offerPayments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOfferPayments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OfferPayment) {
        return item.id;
    }
    registerChangeInOfferPayments() {
        this.eventSubscriber = this.eventManager.subscribe('offerPaymentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
