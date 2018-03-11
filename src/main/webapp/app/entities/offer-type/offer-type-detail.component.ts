import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OfferType } from './offer-type.model';
import { OfferTypeService } from './offer-type.service';

@Component({
    selector: 'apsstr-offer-type-detail',
    templateUrl: './offer-type-detail.component.html'
})
export class OfferTypeDetailComponent implements OnInit, OnDestroy {

    offerType: OfferType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private offerTypeService: OfferTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOfferTypes();
    }

    load(id) {
        this.offerTypeService.find(id)
            .subscribe((offerTypeResponse: HttpResponse<OfferType>) => {
                this.offerType = offerTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOfferTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'offerTypeListModification',
            (response) => this.load(this.offerType.id)
        );
    }
}
