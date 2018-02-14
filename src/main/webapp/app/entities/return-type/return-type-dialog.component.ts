import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ReturnType } from './return-type.model';
import { ReturnTypePopupService } from './return-type-popup.service';
import { ReturnTypeService } from './return-type.service';

@Component({
    selector: 'apsstr-return-type-dialog',
    templateUrl: './return-type-dialog.component.html'
})
export class ReturnTypeDialogComponent implements OnInit {

    returnType: ReturnType;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private returnTypeService: ReturnTypeService,
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
        if (this.returnType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.returnTypeService.update(this.returnType));
        } else {
            this.subscribeToSaveResponse(
                this.returnTypeService.create(this.returnType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ReturnType>>) {
        result.subscribe((res: HttpResponse<ReturnType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ReturnType) {
        this.eventManager.broadcast({ name: 'returnTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'apsstr-return-type-popup',
    template: ''
})
export class ReturnTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private returnTypePopupService: ReturnTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.returnTypePopupService
                    .open(ReturnTypeDialogComponent as Component, params['id']);
            } else {
                this.returnTypePopupService
                    .open(ReturnTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
