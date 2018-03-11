import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OperatingSystemType } from './operating-system-type.model';
import { OperatingSystemTypePopupService } from './operating-system-type-popup.service';
import { OperatingSystemTypeService } from './operating-system-type.service';

@Component({
    selector: 'apsstr-operating-system-type-dialog',
    templateUrl: './operating-system-type-dialog.component.html'
})
export class OperatingSystemTypeDialogComponent implements OnInit {

    operatingSystemType: OperatingSystemType;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private operatingSystemTypeService: OperatingSystemTypeService,
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
        if (this.operatingSystemType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.operatingSystemTypeService.update(this.operatingSystemType));
        } else {
            this.subscribeToSaveResponse(
                this.operatingSystemTypeService.create(this.operatingSystemType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OperatingSystemType>>) {
        result.subscribe((res: HttpResponse<OperatingSystemType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OperatingSystemType) {
        this.eventManager.broadcast({ name: 'operatingSystemTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'apsstr-operating-system-type-popup',
    template: ''
})
export class OperatingSystemTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private operatingSystemTypePopupService: OperatingSystemTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.operatingSystemTypePopupService
                    .open(OperatingSystemTypeDialogComponent as Component, params['id']);
            } else {
                this.operatingSystemTypePopupService
                    .open(OperatingSystemTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
