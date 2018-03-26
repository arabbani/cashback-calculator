import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FlightInfo } from './flight-info.model';
import { FlightInfoService } from './flight-info.service';

@Component({
    selector: 'apsstr-flight-info-detail',
    templateUrl: './flight-info-detail.component.html'
})
export class FlightInfoDetailComponent implements OnInit, OnDestroy {

    flightInfo: FlightInfo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private flightInfoService: FlightInfoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFlightInfos();
    }

    load(id) {
        this.flightInfoService.find(id)
            .subscribe((flightInfoResponse: HttpResponse<FlightInfo>) => {
                this.flightInfo = flightInfoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFlightInfos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'flightInfoListModification',
            (response) => this.load(this.flightInfo.id)
        );
    }
}
