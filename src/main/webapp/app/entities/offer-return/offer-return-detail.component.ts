import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OfferReturn } from './offer-return.model';
import { OfferReturnService } from './offer-return.service';

@Component({
    selector: 'apsstr-offer-return-detail',
    templateUrl: './offer-return-detail.component.html'
})
export class OfferReturnDetailComponent implements OnInit, OnDestroy {

    offerReturn: OfferReturn;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private offerReturnService: OfferReturnService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOfferReturns();
    }

    load(id) {
        this.offerReturnService.find(id)
            .subscribe((offerReturnResponse: HttpResponse<OfferReturn>) => {
                this.offerReturn = offerReturnResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOfferReturns() {
        this.eventSubscriber = this.eventManager.subscribe(
            'offerReturnListModification',
            (response) => this.load(this.offerReturn.id)
        );
    }
}
