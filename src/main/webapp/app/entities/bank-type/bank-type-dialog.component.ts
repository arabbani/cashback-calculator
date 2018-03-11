import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BankType } from './bank-type.model';
import { BankTypePopupService } from './bank-type-popup.service';
import { BankTypeService } from './bank-type.service';

@Component({
    selector: 'apsstr-bank-type-dialog',
    templateUrl: './bank-type-dialog.component.html'
})
export class BankTypeDialogComponent implements OnInit {

    bankType: BankType;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private bankTypeService: BankTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bankType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bankTypeService.update(this.bankType));
        } else {
            this.subscribeToSaveResponse(
                this.bankTypeService.create(this.bankType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BankType>>) {
        result.subscribe((res: HttpResponse<BankType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BankType) {
        this.eventManager.broadcast({ name: 'bankTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'apsstr-bank-type-popup',
    template: ''
})
export class BankTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bankTypePopupService: BankTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bankTypePopupService
                    .open(BankTypeDialogComponent as Component, params['id']);
            } else {
                this.bankTypePopupService
                    .open(BankTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
