import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OfferPayment } from './offer-payment.model';
import { OfferPaymentPopupService } from './offer-payment-popup.service';
import { OfferPaymentService } from './offer-payment.service';

@Component({
    selector: 'apsstr-offer-payment-delete-dialog',
    templateUrl: './offer-payment-delete-dialog.component.html'
})
export class OfferPaymentDeleteDialogComponent {

    offerPayment: OfferPayment;

    constructor(
        private offerPaymentService: OfferPaymentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.offerPaymentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'offerPaymentListModification',
                content: 'Deleted an offerPayment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-offer-payment-delete-popup',
    template: ''
})
export class OfferPaymentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private offerPaymentPopupService: OfferPaymentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.offerPaymentPopupService
                .open(OfferPaymentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
