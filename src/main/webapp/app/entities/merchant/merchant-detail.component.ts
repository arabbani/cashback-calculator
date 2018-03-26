import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Merchant } from './merchant.model';
import { MerchantService } from './merchant.service';

@Component({
    selector: 'apsstr-merchant-detail',
    templateUrl: './merchant-detail.component.html'
})
export class MerchantDetailComponent implements OnInit, OnDestroy {

    merchant: Merchant;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private merchantService: MerchantService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMerchants();
    }

    load(id) {
        this.merchantService.find(id)
            .subscribe((merchantResponse: HttpResponse<Merchant>) => {
                this.merchant = merchantResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMerchants() {
        this.eventSubscriber = this.eventManager.subscribe(
            'merchantListModification',
            (response) => this.load(this.merchant.id)
        );
    }
}
