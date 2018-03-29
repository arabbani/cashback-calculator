import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ReturnType } from './return-type.model';
import { ReturnTypeService } from './return-type.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-return-type',
    templateUrl: './return-type.component.html'
})
export class ReturnTypeComponent implements OnInit, OnDestroy {
returnTypes: ReturnType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private returnTypeService: ReturnTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.returnTypeService.query().subscribe(
            (res: HttpResponse<ReturnType[]>) => {
                this.returnTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInReturnTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ReturnType) {
        return item.id;
    }
    registerChangeInReturnTypes() {
        this.eventSubscriber = this.eventManager.subscribe('returnTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
