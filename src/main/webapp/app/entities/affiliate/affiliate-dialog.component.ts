import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Affiliate } from './affiliate.model';
import { AffiliatePopupService } from './affiliate-popup.service';
import { AffiliateService } from './affiliate.service';

@Component({
    selector: 'apsstr-affiliate-dialog',
    templateUrl: './affiliate-dialog.component.html'
})
export class AffiliateDialogComponent implements OnInit {

    affiliate: Affiliate;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private affiliateService: AffiliateService,
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
        if (this.affiliate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.affiliateService.update(this.affiliate));
        } else {
            this.subscribeToSaveResponse(
                this.affiliateService.create(this.affiliate));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Affiliate>>) {
        result.subscribe((res: HttpResponse<Affiliate>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Affiliate) {
        this.eventManager.broadcast({ name: 'affiliateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'apsstr-affiliate-popup',
    template: ''
})
export class AffiliatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private affiliatePopupService: AffiliatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.affiliatePopupService
                    .open(AffiliateDialogComponent as Component, params['id']);
            } else {
                this.affiliatePopupService
                    .open(AffiliateDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}