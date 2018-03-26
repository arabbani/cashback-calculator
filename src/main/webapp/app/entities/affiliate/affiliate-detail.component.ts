import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Affiliate } from './affiliate.model';
import { AffiliateService } from './affiliate.service';

@Component({
    selector: 'apsstr-affiliate-detail',
    templateUrl: './affiliate-detail.component.html'
})
export class AffiliateDetailComponent implements OnInit, OnDestroy {

    affiliate: Affiliate;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private affiliateService: AffiliateService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAffiliates();
    }

    load(id) {
        this.affiliateService.find(id)
            .subscribe((affiliateResponse: HttpResponse<Affiliate>) => {
                this.affiliate = affiliateResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAffiliates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'affiliateListModification',
            (response) => this.load(this.affiliate.id)
        );
    }
}
