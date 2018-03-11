import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OperatingSystem } from './operating-system.model';
import { OperatingSystemPopupService } from './operating-system-popup.service';
import { OperatingSystemService } from './operating-system.service';
import { OperatingSystemType, OperatingSystemTypeService } from '../operating-system-type';

@Component({
    selector: 'apsstr-operating-system-dialog',
    templateUrl: './operating-system-dialog.component.html'
})
export class OperatingSystemDialogComponent implements OnInit {

    operatingSystem: OperatingSystem;
    isSaving: boolean;

    operatingsystemtypes: OperatingSystemType[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private operatingSystemService: OperatingSystemService,
        private operatingSystemTypeService: OperatingSystemTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.operatingSystemTypeService.query()
            .subscribe((res: HttpResponse<OperatingSystemType[]>) => { this.operatingsystemtypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.operatingSystem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.operatingSystemService.update(this.operatingSystem));
        } else {
            this.subscribeToSaveResponse(
                this.operatingSystemService.create(this.operatingSystem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OperatingSystem>>) {
        result.subscribe((res: HttpResponse<OperatingSystem>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OperatingSystem) {
        this.eventManager.broadcast({ name: 'operatingSystemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOperatingSystemTypeById(index: number, item: OperatingSystemType) {
        return item.id;
    }
}

@Component({
    selector: 'apsstr-operating-system-popup',
    template: ''
})
export class OperatingSystemPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private operatingSystemPopupService: OperatingSystemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.operatingSystemPopupService
                    .open(OperatingSystemDialogComponent as Component, params['id']);
            } else {
                this.operatingSystemPopupService
                    .open(OperatingSystemDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
