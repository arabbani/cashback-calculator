import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MainReturn } from './main-return.model';
import { MainReturnService } from './main-return.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-main-return',
    templateUrl: './main-return.component.html'
})
export class MainReturnComponent implements OnInit, OnDestroy {
mainReturns: MainReturn[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private mainReturnService: MainReturnService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.mainReturnService.query().subscribe(
            (res: HttpResponse<MainReturn[]>) => {
                this.mainReturns = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMainReturns();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MainReturn) {
        return item.id;
    }
    registerChangeInMainReturns() {
        this.eventSubscriber = this.eventManager.subscribe('mainReturnListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
