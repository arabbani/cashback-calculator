import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OfferType } from './offer-type.model';
import { OfferTypePopupService } from './offer-type-popup.service';
import { OfferTypeService } from './offer-type.service';

@Component({
    selector: 'apsstr-offer-type-delete-dialog',
    templateUrl: './offer-type-delete-dialog.component.html'
})
export class OfferTypeDeleteDialogComponent {

    offerType: OfferType;

    constructor(
        private offerTypeService: OfferTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.offerTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'offerTypeListModification',
                content: 'Deleted an offerType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-offer-type-delete-popup',
    template: ''
})
export class OfferTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private offerTypePopupService: OfferTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.offerTypePopupService
                .open(OfferTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
