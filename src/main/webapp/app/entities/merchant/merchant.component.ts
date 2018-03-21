import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Merchant } from './merchant.model';
import { MerchantService } from './merchant.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-merchant',
    templateUrl: './merchant.component.html'
})
export class MerchantComponent implements OnInit, OnDestroy {
merchants: Merchant[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private merchantService: MerchantService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.merchantService.query().subscribe(
            (res: HttpResponse<Merchant[]>) => {
                this.merchants = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMerchants();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Merchant) {
        return item.id;
    }
    registerChangeInMerchants() {
        this.eventSubscriber = this.eventManager.subscribe('merchantListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
