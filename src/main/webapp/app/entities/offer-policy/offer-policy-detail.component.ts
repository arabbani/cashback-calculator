import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OfferPolicy } from './offer-policy.model';
import { OfferPolicyService } from './offer-policy.service';

@Component({
    selector: 'apsstr-offer-policy-detail',
    templateUrl: './offer-policy-detail.component.html'
})
export class OfferPolicyDetailComponent implements OnInit, OnDestroy {

    offerPolicy: OfferPolicy;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private offerPolicyService: OfferPolicyService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOfferPolicies();
    }

    load(id) {
        this.offerPolicyService.find(id)
            .subscribe((offerPolicyResponse: HttpResponse<OfferPolicy>) => {
                this.offerPolicy = offerPolicyResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOfferPolicies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'offerPolicyListModification',
            (response) => this.load(this.offerPolicy.id)
        );
    }
}
