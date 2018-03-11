import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BankType } from './bank-type.model';
import { BankTypeService } from './bank-type.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-bank-type',
    templateUrl: './bank-type.component.html'
})
export class BankTypeComponent implements OnInit, OnDestroy {
bankTypes: BankType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private bankTypeService: BankTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.bankTypeService.query().subscribe(
            (res: HttpResponse<BankType[]>) => {
                this.bankTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBankTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: BankType) {
        return item.id;
    }
    registerChangeInBankTypes() {
        this.eventSubscriber = this.eventManager.subscribe('bankTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
