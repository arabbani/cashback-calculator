import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AffiliateCredential } from './affiliate-credential.model';
import { AffiliateCredentialService } from './affiliate-credential.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-affiliate-credential',
    templateUrl: './affiliate-credential.component.html'
})
export class AffiliateCredentialComponent implements OnInit, OnDestroy {
affiliateCredentials: AffiliateCredential[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private affiliateCredentialService: AffiliateCredentialService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.affiliateCredentialService.query().subscribe(
            (res: HttpResponse<AffiliateCredential[]>) => {
                this.affiliateCredentials = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAffiliateCredentials();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AffiliateCredential) {
        return item.id;
    }
    registerChangeInAffiliateCredentials() {
        this.eventSubscriber = this.eventManager.subscribe('affiliateCredentialListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
