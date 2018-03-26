import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TravelInfo } from './travel-info.model';
import { TravelInfoService } from './travel-info.service';

@Component({
    selector: 'apsstr-travel-info-detail',
    templateUrl: './travel-info-detail.component.html'
})
export class TravelInfoDetailComponent implements OnInit, OnDestroy {

    travelInfo: TravelInfo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private travelInfoService: TravelInfoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTravelInfos();
    }

    load(id) {
        this.travelInfoService.find(id)
            .subscribe((travelInfoResponse: HttpResponse<TravelInfo>) => {
                this.travelInfo = travelInfoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTravelInfos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'travelInfoListModification',
            (response) => this.load(this.travelInfo.id)
        );
    }
}
