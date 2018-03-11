import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OfferPayment } from './offer-payment.model';
import { OfferPaymentService } from './offer-payment.service';

@Component({
    selector: 'apsstr-offer-payment-detail',
    templateUrl: './offer-payment-detail.component.html'
})
export class OfferPaymentDetailComponent implements OnInit, OnDestroy {

    offerPayment: OfferPayment;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private offerPaymentService: OfferPaymentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOfferPayments();
    }

    load(id) {
        this.offerPaymentService.find(id)
            .subscribe((offerPaymentResponse: HttpResponse<OfferPayment>) => {
                this.offerPayment = offerPaymentResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOfferPayments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'offerPaymentListModification',
            (response) => this.load(this.offerPayment.id)
        );
    }
}
