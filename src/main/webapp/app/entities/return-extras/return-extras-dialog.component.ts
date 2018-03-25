import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ReturnExtras } from './return-extras.model';
import { ReturnExtrasPopupService } from './return-extras-popup.service';
import { ReturnExtrasService } from './return-extras.service';

@Component({
    selector: 'apsstr-return-extras-dialog',
    templateUrl: './return-extras-dialog.component.html'
})
export class ReturnExtrasDialogComponent implements OnInit {

    returnExtras: ReturnExtras;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private returnExtrasService: ReturnExtrasService,
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
        if (this.returnExtras.id !== undefined) {
            this.subscribeToSaveResponse(
                this.returnExtrasService.update(this.returnExtras));
        } else {
            this.subscribeToSaveResponse(
                this.returnExtrasService.create(this.returnExtras));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ReturnExtras>>) {
        result.subscribe((res: HttpResponse<ReturnExtras>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ReturnExtras) {
        this.eventManager.broadcast({ name: 'returnExtrasListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'apsstr-return-extras-popup',
    template: ''
})
export class ReturnExtrasPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private returnExtrasPopupService: ReturnExtrasPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.returnExtrasPopupService
                    .open(ReturnExtrasDialogComponent as Component, params['id']);
            } else {
                this.returnExtrasPopupService
                    .open(ReturnExtrasDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
