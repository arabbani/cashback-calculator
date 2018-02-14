import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Affiliate } from './affiliate.model';
import { AffiliateService } from './affiliate.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-affiliate',
    templateUrl: './affiliate.component.html'
})
export class AffiliateComponent implements OnInit, OnDestroy {
affiliates: Affiliate[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private affiliateService: AffiliateService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.affiliateService.query().subscribe(
            (res: HttpResponse<Affiliate[]>) => {
                this.affiliates = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAffiliates();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Affiliate) {
        return item.id;
    }
    registerChangeInAffiliates() {
        this.eventSubscriber = this.eventManager.subscribe('affiliateListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
