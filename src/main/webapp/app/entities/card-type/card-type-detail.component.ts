import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CardType } from './card-type.model';
import { CardTypeService } from './card-type.service';

@Component({
    selector: 'apsstr-card-type-detail',
    templateUrl: './card-type-detail.component.html'
})
export class CardTypeDetailComponent implements OnInit, OnDestroy {

    cardType: CardType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cardTypeService: CardTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCardTypes();
    }

    load(id) {
        this.cardTypeService.find(id)
            .subscribe((cardTypeResponse: HttpResponse<CardType>) => {
                this.cardType = cardTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCardTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cardTypeListModification',
            (response) => this.load(this.cardType.id)
        );
    }
}
