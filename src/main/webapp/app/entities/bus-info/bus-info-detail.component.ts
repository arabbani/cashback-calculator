import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BusInfo } from './bus-info.model';
import { BusInfoService } from './bus-info.service';

@Component({
    selector: 'apsstr-bus-info-detail',
    templateUrl: './bus-info-detail.component.html'
})
export class BusInfoDetailComponent implements OnInit, OnDestroy {

    busInfo: BusInfo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private busInfoService: BusInfoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBusInfos();
    }

    load(id) {
        this.busInfoService.find(id)
            .subscribe((busInfoResponse: HttpResponse<BusInfo>) => {
                this.busInfo = busInfoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBusInfos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'busInfoListModification',
            (response) => this.load(this.busInfo.id)
        );
    }
}
