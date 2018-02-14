import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OfferReturn } from './offer-return.model';
import { OfferReturnPopupService } from './offer-return-popup.service';
import { OfferReturnService } from './offer-return.service';
import { ReturnExtras, ReturnExtrasService } from '../return-extras';
import { Offer, OfferService } from '../offer';

@Component({
    selector: 'apsstr-offer-return-dialog',
    templateUrl: './offer-return-dialog.component.html'
})
export class OfferReturnDialogComponent implements OnInit {

    offerReturn: OfferReturn;
    isSaving: boolean;

    extras: ReturnExtras[];

    offers: Offer[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private offerReturnService: OfferReturnService,
        private returnExtrasService: ReturnExtrasService,
        private offerService: OfferService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.returnExtrasService
            .query({filter: 'offerreturn-is-null'})
            .subscribe((res: HttpResponse<ReturnExtras[]>) => {
                if (!this.offerReturn.extras || !this.offerReturn.extras.id) {
                    this.extras = res.body;
                } else {
                    this.returnExtrasService
                        .find(this.offerReturn.extras.id)
                        .subscribe((subRes: HttpResponse<ReturnExtras>) => {
                            this.extras = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.offerService.query()
            .subscribe((res: HttpResponse<Offer[]>) => { this.offers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.offerReturn.id !== undefined) {
            this.subscribeToSaveResponse(
                this.offerReturnService.update(this.offerReturn));
        } else {
            this.subscribeToSaveResponse(
                this.offerReturnService.create(this.offerReturn));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OfferReturn>>) {
        result.subscribe((res: HttpResponse<OfferReturn>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OfferReturn) {
        this.eventManager.broadcast({ name: 'offerReturnListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackReturnExtrasById(index: number, item: ReturnExtras) {
        return item.id;
    }

    trackOfferById(index: number, item: Offer) {
        return item.id;
    }
}

@Component({
    selector: 'apsstr-offer-return-popup',
    template: ''
})
export class OfferReturnPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private offerReturnPopupService: OfferReturnPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.offerReturnPopupService
                    .open(OfferReturnDialogComponent as Component, params['id']);
            } else {
                this.offerReturnPopupService
                    .open(OfferReturnDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
