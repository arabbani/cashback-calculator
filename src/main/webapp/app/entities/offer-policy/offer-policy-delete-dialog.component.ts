import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OfferPolicy } from './offer-policy.model';
import { OfferPolicyPopupService } from './offer-policy-popup.service';
import { OfferPolicyService } from './offer-policy.service';

@Component({
    selector: 'apsstr-offer-policy-delete-dialog',
    templateUrl: './offer-policy-delete-dialog.component.html'
})
export class OfferPolicyDeleteDialogComponent {

    offerPolicy: OfferPolicy;

    constructor(
        private offerPolicyService: OfferPolicyService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.offerPolicyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'offerPolicyListModification',
                content: 'Deleted an offerPolicy'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-offer-policy-delete-popup',
    template: ''
})
export class OfferPolicyDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private offerPolicyPopupService: OfferPolicyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.offerPolicyPopupService
                .open(OfferPolicyDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
