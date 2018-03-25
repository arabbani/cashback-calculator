import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CardProvider } from './card-provider.model';
import { CardProviderService } from './card-provider.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-card-provider',
    templateUrl: './card-provider.component.html'
})
export class CardProviderComponent implements OnInit, OnDestroy {
cardProviders: CardProvider[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cardProviderService: CardProviderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cardProviderService.query().subscribe(
            (res: HttpResponse<CardProvider[]>) => {
                this.cardProviders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCardProviders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CardProvider) {
        return item.id;
    }
    registerChangeInCardProviders() {
        this.eventSubscriber = this.eventManager.subscribe('cardProviderListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
