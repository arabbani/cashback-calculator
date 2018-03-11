import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ReechargeInfo } from './reecharge-info.model';
import { ReechargeInfoService } from './reecharge-info.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-reecharge-info',
    templateUrl: './reecharge-info.component.html'
})
export class ReechargeInfoComponent implements OnInit, OnDestroy {
reechargeInfos: ReechargeInfo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private reechargeInfoService: ReechargeInfoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.reechargeInfoService.query().subscribe(
            (res: HttpResponse<ReechargeInfo[]>) => {
                this.reechargeInfos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInReechargeInfos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ReechargeInfo) {
        return item.id;
    }
    registerChangeInReechargeInfos() {
        this.eventSubscriber = this.eventManager.subscribe('reechargeInfoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
