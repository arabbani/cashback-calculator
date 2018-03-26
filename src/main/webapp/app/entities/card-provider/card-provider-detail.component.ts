import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CardProvider } from './card-provider.model';
import { CardProviderService } from './card-provider.service';

@Component({
    selector: 'apsstr-card-provider-detail',
    templateUrl: './card-provider-detail.component.html'
})
export class CardProviderDetailComponent implements OnInit, OnDestroy {

    cardProvider: CardProvider;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cardProviderService: CardProviderService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCardProviders();
    }

    load(id) {
        this.cardProviderService.find(id)
            .subscribe((cardProviderResponse: HttpResponse<CardProvider>) => {
                this.cardProvider = cardProviderResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCardProviders() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cardProviderListModification',
            (response) => this.load(this.cardProvider.id)
        );
    }
}
