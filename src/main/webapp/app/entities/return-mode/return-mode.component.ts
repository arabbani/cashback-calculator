import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ReturnMode } from './return-mode.model';
import { ReturnModeService } from './return-mode.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-return-mode',
    templateUrl: './return-mode.component.html'
})
export class ReturnModeComponent implements OnInit, OnDestroy {
returnModes: ReturnMode[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private returnModeService: ReturnModeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.returnModeService.query().subscribe(
            (res: HttpResponse<ReturnMode[]>) => {
                this.returnModes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInReturnModes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ReturnMode) {
        return item.id;
    }
    registerChangeInReturnModes() {
        this.eventSubscriber = this.eventManager.subscribe('returnModeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
