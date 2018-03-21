import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OfferType } from './offer-type.model';
import { OfferTypePopupService } from './offer-type-popup.service';
import { OfferTypeService } from './offer-type.service';

@Component({
    selector: 'apsstr-offer-type-dialog',
    templateUrl: './offer-type-dialog.component.html'
})
export class OfferTypeDialogComponent implements OnInit {

    offerType: OfferType;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private offerTypeService: OfferTypeService,
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
        if (this.offerType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.offerTypeService.update(this.offerType));
        } else {
            this.subscribeToSaveResponse(
                this.offerTypeService.create(this.offerType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OfferType>>) {
        result.subscribe((res: HttpResponse<OfferType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OfferType) {
        this.eventManager.broadcast({ name: 'offerTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'apsstr-offer-type-popup',
    template: ''
})
export class OfferTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private offerTypePopupService: OfferTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.offerTypePopupService
                    .open(OfferTypeDialogComponent as Component, params['id']);
            } else {
                this.offerTypePopupService
                    .open(OfferTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
