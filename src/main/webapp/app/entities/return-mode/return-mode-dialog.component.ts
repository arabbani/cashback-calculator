import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ReturnMode } from './return-mode.model';
import { ReturnModePopupService } from './return-mode-popup.service';
import { ReturnModeService } from './return-mode.service';

@Component({
    selector: 'apsstr-return-mode-dialog',
    templateUrl: './return-mode-dialog.component.html'
})
export class ReturnModeDialogComponent implements OnInit {

    returnMode: ReturnMode;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private returnModeService: ReturnModeService,
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
        if (this.returnMode.id !== undefined) {
            this.subscribeToSaveResponse(
                this.returnModeService.update(this.returnMode));
        } else {
            this.subscribeToSaveResponse(
                this.returnModeService.create(this.returnMode));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ReturnMode>>) {
        result.subscribe((res: HttpResponse<ReturnMode>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ReturnMode) {
        this.eventManager.broadcast({ name: 'returnModeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'apsstr-return-mode-popup',
    template: ''
})
export class ReturnModePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private returnModePopupService: ReturnModePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.returnModePopupService
                    .open(ReturnModeDialogComponent as Component, params['id']);
            } else {
                this.returnModePopupService
                    .open(ReturnModeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
