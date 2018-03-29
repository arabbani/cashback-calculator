import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BusInfo } from './bus-info.model';
import { BusInfoService } from './bus-info.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-bus-info',
    templateUrl: './bus-info.component.html'
})
export class BusInfoComponent implements OnInit, OnDestroy {
busInfos: BusInfo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private busInfoService: BusInfoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.busInfoService.query().subscribe(
            (res: HttpResponse<BusInfo[]>) => {
                this.busInfos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBusInfos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: BusInfo) {
        return item.id;
    }
    registerChangeInBusInfos() {
        this.eventSubscriber = this.eventManager.subscribe('busInfoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
