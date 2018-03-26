import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OfferReturn } from './offer-return.model';
import { OfferReturnPopupService } from './offer-return-popup.service';
import { OfferReturnService } from './offer-return.service';

@Component({
    selector: 'apsstr-offer-return-delete-dialog',
    templateUrl: './offer-return-delete-dialog.component.html'
})
export class OfferReturnDeleteDialogComponent {

    offerReturn: OfferReturn;

    constructor(
        private offerReturnService: OfferReturnService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.offerReturnService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'offerReturnListModification',
                content: 'Deleted an offerReturn'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-offer-return-delete-popup',
    template: ''
})
export class OfferReturnDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private offerReturnPopupService: OfferReturnPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.offerReturnPopupService
                .open(OfferReturnDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
