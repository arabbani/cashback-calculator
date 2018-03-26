import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OfferPayment } from './offer-payment.model';
import { OfferPaymentPopupService } from './offer-payment-popup.service';
import { OfferPaymentService } from './offer-payment.service';
import { Card, CardService } from '../card';

@Component({
    selector: 'apsstr-offer-payment-dialog',
    templateUrl: './offer-payment-dialog.component.html'
})
export class OfferPaymentDialogComponent implements OnInit {

    offerPayment: OfferPayment;
    isSaving: boolean;

    cards: Card[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private offerPaymentService: OfferPaymentService,
        private cardService: CardService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cardService.query()
            .subscribe((res: HttpResponse<Card[]>) => { this.cards = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.offerPayment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.offerPaymentService.update(this.offerPayment));
        } else {
            this.subscribeToSaveResponse(
                this.offerPaymentService.create(this.offerPayment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OfferPayment>>) {
        result.subscribe((res: HttpResponse<OfferPayment>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OfferPayment) {
        this.eventManager.broadcast({ name: 'offerPaymentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCardById(index: number, item: Card) {
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
    selector: 'apsstr-offer-payment-popup',
    template: ''
})
export class OfferPaymentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private offerPaymentPopupService: OfferPaymentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.offerPaymentPopupService
                    .open(OfferPaymentDialogComponent as Component, params['id']);
            } else {
                this.offerPaymentPopupService
                    .open(OfferPaymentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
