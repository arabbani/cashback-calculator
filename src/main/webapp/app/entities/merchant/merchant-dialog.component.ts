import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Merchant } from './merchant.model';
import { MerchantPopupService } from './merchant-popup.service';
import { MerchantService } from './merchant.service';
import { SubCategory, SubCategoryService } from '../sub-category';

@Component({
    selector: 'apsstr-merchant-dialog',
    templateUrl: './merchant-dialog.component.html'
})
export class MerchantDialogComponent implements OnInit {

    merchant: Merchant;
    isSaving: boolean;

    subcategories: SubCategory[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private merchantService: MerchantService,
        private subCategoryService: SubCategoryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.subCategoryService.query()
            .subscribe((res: HttpResponse<SubCategory[]>) => { this.subcategories = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.merchant.id !== undefined) {
            this.subscribeToSaveResponse(
                this.merchantService.update(this.merchant));
        } else {
            this.subscribeToSaveResponse(
                this.merchantService.create(this.merchant));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Merchant>>) {
        result.subscribe((res: HttpResponse<Merchant>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Merchant) {
        this.eventManager.broadcast({ name: 'merchantListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSubCategoryById(index: number, item: SubCategory) {
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
    selector: 'apsstr-merchant-popup',
    template: ''
})
export class MerchantPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private merchantPopupService: MerchantPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.merchantPopupService
                    .open(MerchantDialogComponent as Component, params['id']);
            } else {
                this.merchantPopupService
                    .open(MerchantDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
