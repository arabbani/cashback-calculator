import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ReturnExtras } from './return-extras.model';
import { ReturnExtrasService } from './return-extras.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-return-extras',
    templateUrl: './return-extras.component.html'
})
export class ReturnExtrasComponent implements OnInit, OnDestroy {
returnExtras: ReturnExtras[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private returnExtrasService: ReturnExtrasService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.returnExtrasService.query().subscribe(
            (res: HttpResponse<ReturnExtras[]>) => {
                this.returnExtras = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInReturnExtras();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ReturnExtras) {
        return item.id;
    }
    registerChangeInReturnExtras() {
        this.eventSubscriber = this.eventManager.subscribe('returnExtrasListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
