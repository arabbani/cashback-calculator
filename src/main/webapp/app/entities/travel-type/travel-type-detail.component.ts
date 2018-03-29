import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TravelType } from './travel-type.model';
import { TravelTypeService } from './travel-type.service';

@Component({
    selector: 'apsstr-travel-type-detail',
    templateUrl: './travel-type-detail.component.html'
})
export class TravelTypeDetailComponent implements OnInit, OnDestroy {

    travelType: TravelType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private travelTypeService: TravelTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTravelTypes();
    }

    load(id) {
        this.travelTypeService.find(id)
            .subscribe((travelTypeResponse: HttpResponse<TravelType>) => {
                this.travelType = travelTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTravelTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'travelTypeListModification',
            (response) => this.load(this.travelType.id)
        );
    }
}
