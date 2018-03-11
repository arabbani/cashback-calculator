import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ReturnInfo } from './return-info.model';
import { ReturnInfoService } from './return-info.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-return-info',
    templateUrl: './return-info.component.html'
})
export class ReturnInfoComponent implements OnInit, OnDestroy {
returnInfos: ReturnInfo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private returnInfoService: ReturnInfoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.returnInfoService.query().subscribe(
            (res: HttpResponse<ReturnInfo[]>) => {
                this.returnInfos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInReturnInfos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ReturnInfo) {
        return item.id;
    }
    registerChangeInReturnInfos() {
        this.eventSubscriber = this.eventManager.subscribe('returnInfoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
