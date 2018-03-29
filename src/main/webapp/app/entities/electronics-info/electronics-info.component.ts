import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ElectronicsInfo } from './electronics-info.model';
import { ElectronicsInfoService } from './electronics-info.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-electronics-info',
    templateUrl: './electronics-info.component.html'
})
export class ElectronicsInfoComponent implements OnInit, OnDestroy {
electronicsInfos: ElectronicsInfo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private electronicsInfoService: ElectronicsInfoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.electronicsInfoService.query().subscribe(
            (res: HttpResponse<ElectronicsInfo[]>) => {
                this.electronicsInfos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInElectronicsInfos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ElectronicsInfo) {
        return item.id;
    }
    registerChangeInElectronicsInfos() {
        this.eventSubscriber = this.eventManager.subscribe('electronicsInfoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
