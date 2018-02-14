import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ReechargePlanType } from './reecharge-plan-type.model';
import { ReechargePlanTypePopupService } from './reecharge-plan-type-popup.service';
import { ReechargePlanTypeService } from './reecharge-plan-type.service';

@Component({
    selector: 'apsstr-reecharge-plan-type-dialog',
    templateUrl: './reecharge-plan-type-dialog.component.html'
})
export class ReechargePlanTypeDialogComponent implements OnInit {

    reechargePlanType: ReechargePlanType;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private reechargePlanTypeService: ReechargePlanTypeService,
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
        if (this.reechargePlanType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.reechargePlanTypeService.update(this.reechargePlanType));
        } else {
            this.subscribeToSaveResponse(
                this.reechargePlanTypeService.create(this.reechargePlanType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ReechargePlanType>>) {
        result.subscribe((res: HttpResponse<ReechargePlanType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ReechargePlanType) {
        this.eventManager.broadcast({ name: 'reechargePlanTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'apsstr-reecharge-plan-type-popup',
    template: ''
})
export class ReechargePlanTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reechargePlanTypePopupService: ReechargePlanTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.reechargePlanTypePopupService
                    .open(ReechargePlanTypeDialogComponent as Component, params['id']);
            } else {
                this.reechargePlanTypePopupService
                    .open(ReechargePlanTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
