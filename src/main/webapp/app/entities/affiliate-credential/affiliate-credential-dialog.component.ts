import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AffiliateCredential } from './affiliate-credential.model';
import { AffiliateCredentialPopupService } from './affiliate-credential-popup.service';
import { AffiliateCredentialService } from './affiliate-credential.service';
import { Affiliate, AffiliateService } from '../affiliate';

@Component({
    selector: 'apsstr-affiliate-credential-dialog',
    templateUrl: './affiliate-credential-dialog.component.html'
})
export class AffiliateCredentialDialogComponent implements OnInit {

    affiliateCredential: AffiliateCredential;
    isSaving: boolean;

    affiliates: Affiliate[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private affiliateCredentialService: AffiliateCredentialService,
        private affiliateService: AffiliateService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.affiliateService.query()
            .subscribe((res: HttpResponse<Affiliate[]>) => { this.affiliates = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.affiliateCredential.id !== undefined) {
            this.subscribeToSaveResponse(
                this.affiliateCredentialService.update(this.affiliateCredential));
        } else {
            this.subscribeToSaveResponse(
                this.affiliateCredentialService.create(this.affiliateCredential));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AffiliateCredential>>) {
        result.subscribe((res: HttpResponse<AffiliateCredential>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AffiliateCredential) {
        this.eventManager.broadcast({ name: 'affiliateCredentialListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAffiliateById(index: number, item: Affiliate) {
        return item.id;
    }
}

@Component({
    selector: 'apsstr-affiliate-credential-popup',
    template: ''
})
export class AffiliateCredentialPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private affiliateCredentialPopupService: AffiliateCredentialPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.affiliateCredentialPopupService
                    .open(AffiliateCredentialDialogComponent as Component, params['id']);
            } else {
                this.affiliateCredentialPopupService
                    .open(AffiliateCredentialDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
