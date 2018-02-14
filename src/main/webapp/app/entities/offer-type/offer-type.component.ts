import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OfferType } from './offer-type.model';
import { OfferTypeService } from './offer-type.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-offer-type',
    templateUrl: './offer-type.component.html'
})
export class OfferTypeComponent implements OnInit, OnDestroy {
offerTypes: OfferType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private offerTypeService: OfferTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.offerTypeService.query().subscribe(
            (res: HttpResponse<OfferType[]>) => {
                this.offerTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOfferTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OfferType) {
        return item.id;
    }
    registerChangeInOfferTypes() {
        this.eventSubscriber = this.eventManager.subscribe('offerTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
