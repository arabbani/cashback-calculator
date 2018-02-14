import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TravelInfo } from './travel-info.model';
import { TravelInfoService } from './travel-info.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-travel-info',
    templateUrl: './travel-info.component.html'
})
export class TravelInfoComponent implements OnInit, OnDestroy {
travelInfos: TravelInfo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private travelInfoService: TravelInfoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.travelInfoService.query().subscribe(
            (res: HttpResponse<TravelInfo[]>) => {
                this.travelInfos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTravelInfos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TravelInfo) {
        return item.id;
    }
    registerChangeInTravelInfos() {
        this.eventSubscriber = this.eventManager.subscribe('travelInfoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
