import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AffiliateCredential } from './affiliate-credential.model';
import { AffiliateCredentialService } from './affiliate-credential.service';

@Component({
    selector: 'apsstr-affiliate-credential-detail',
    templateUrl: './affiliate-credential-detail.component.html'
})
export class AffiliateCredentialDetailComponent implements OnInit, OnDestroy {

    affiliateCredential: AffiliateCredential;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private affiliateCredentialService: AffiliateCredentialService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAffiliateCredentials();
    }

    load(id) {
        this.affiliateCredentialService.find(id)
            .subscribe((affiliateCredentialResponse: HttpResponse<AffiliateCredential>) => {
                this.affiliateCredential = affiliateCredentialResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAffiliateCredentials() {
        this.eventSubscriber = this.eventManager.subscribe(
            'affiliateCredentialListModification',
            (response) => this.load(this.affiliateCredential.id)
        );
    }
}
