import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Brand } from './brand.model';
import { BrandPopupService } from './brand-popup.service';
import { BrandService } from './brand.service';
import { SubCategory, SubCategoryService } from '../sub-category';

@Component({
    selector: 'apsstr-brand-dialog',
    templateUrl: './brand-dialog.component.html'
})
export class BrandDialogComponent implements OnInit {

    brand: Brand;
    isSaving: boolean;

    subcategories: SubCategory[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private brandService: BrandService,
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
        if (this.brand.id !== undefined) {
            this.subscribeToSaveResponse(
                this.brandService.update(this.brand));
        } else {
            this.subscribeToSaveResponse(
                this.brandService.create(this.brand));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Brand>>) {
        result.subscribe((res: HttpResponse<Brand>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Brand) {
        this.eventManager.broadcast({ name: 'brandListModification', content: 'OK'});
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
    selector: 'apsstr-brand-popup',
    template: ''
})
export class BrandPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private brandPopupService: BrandPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.brandPopupService
                    .open(BrandDialogComponent as Component, params['id']);
            } else {
                this.brandPopupService
                    .open(BrandDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
