import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ReechargeInfo } from './reecharge-info.model';
import { ReechargeInfoPopupService } from './reecharge-info-popup.service';
import { ReechargeInfoService } from './reecharge-info.service';
import { Circle, CircleService } from '../circle';

@Component({
    selector: 'apsstr-reecharge-info-dialog',
    templateUrl: './reecharge-info-dialog.component.html'
})
export class ReechargeInfoDialogComponent implements OnInit {

    reechargeInfo: ReechargeInfo;
    isSaving: boolean;

    circles: Circle[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private reechargeInfoService: ReechargeInfoService,
        private circleService: CircleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.circleService.query()
            .subscribe((res: HttpResponse<Circle[]>) => { this.circles = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.reechargeInfo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.reechargeInfoService.update(this.reechargeInfo));
        } else {
            this.subscribeToSaveResponse(
                this.reechargeInfoService.create(this.reechargeInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ReechargeInfo>>) {
        result.subscribe((res: HttpResponse<ReechargeInfo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ReechargeInfo) {
        this.eventManager.broadcast({ name: 'reechargeInfoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCircleById(index: number, item: Circle) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'apsstr-reecharge-info-popup',
    template: ''
})
export class ReechargeInfoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reechargeInfoPopupService: ReechargeInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.reechargeInfoPopupService
                    .open(ReechargeInfoDialogComponent as Component, params['id']);
            } else {
                this.reechargeInfoPopupService
                    .open(ReechargeInfoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
