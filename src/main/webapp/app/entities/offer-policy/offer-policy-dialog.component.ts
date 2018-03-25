import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OfferPolicy } from './offer-policy.model';
import { OfferPolicyPopupService } from './offer-policy-popup.service';
import { OfferPolicyService } from './offer-policy.service';

@Component({
    selector: 'apsstr-offer-policy-dialog',
    templateUrl: './offer-policy-dialog.component.html'
})
export class OfferPolicyDialogComponent implements OnInit {

    offerPolicy: OfferPolicy;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private offerPolicyService: OfferPolicyService,
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
        if (this.offerPolicy.id !== undefined) {
            this.subscribeToSaveResponse(
                this.offerPolicyService.update(this.offerPolicy));
        } else {
            this.subscribeToSaveResponse(
                this.offerPolicyService.create(this.offerPolicy));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OfferPolicy>>) {
        result.subscribe((res: HttpResponse<OfferPolicy>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OfferPolicy) {
        this.eventManager.broadcast({ name: 'offerPolicyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'apsstr-offer-policy-popup',
    template: ''
})
export class OfferPolicyPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private offerPolicyPopupService: OfferPolicyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.offerPolicyPopupService
                    .open(OfferPolicyDialogComponent as Component, params['id']);
            } else {
                this.offerPolicyPopupService
                    .open(OfferPolicyDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
