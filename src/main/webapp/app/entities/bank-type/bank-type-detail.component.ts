import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BankType } from './bank-type.model';
import { BankTypeService } from './bank-type.service';

@Component({
    selector: 'apsstr-bank-type-detail',
    templateUrl: './bank-type-detail.component.html'
})
export class BankTypeDetailComponent implements OnInit, OnDestroy {

    bankType: BankType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bankTypeService: BankTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBankTypes();
    }

    load(id) {
        this.bankTypeService.find(id)
            .subscribe((bankTypeResponse: HttpResponse<BankType>) => {
                this.bankType = bankTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBankTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bankTypeListModification',
            (response) => this.load(this.bankType.id)
        );
    }
}
