import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TravelType } from './travel-type.model';
import { TravelTypePopupService } from './travel-type-popup.service';
import { TravelTypeService } from './travel-type.service';

@Component({
    selector: 'apsstr-travel-type-dialog',
    templateUrl: './travel-type-dialog.component.html'
})
export class TravelTypeDialogComponent implements OnInit {

    travelType: TravelType;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private travelTypeService: TravelTypeService,
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
        if (this.travelType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.travelTypeService.update(this.travelType));
        } else {
            this.subscribeToSaveResponse(
                this.travelTypeService.create(this.travelType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TravelType>>) {
        result.subscribe((res: HttpResponse<TravelType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TravelType) {
        this.eventManager.broadcast({ name: 'travelTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'apsstr-travel-type-popup',
    template: ''
})
export class TravelTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private travelTypePopupService: TravelTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.travelTypePopupService
                    .open(TravelTypeDialogComponent as Component, params['id']);
            } else {
                this.travelTypePopupService
                    .open(TravelTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
