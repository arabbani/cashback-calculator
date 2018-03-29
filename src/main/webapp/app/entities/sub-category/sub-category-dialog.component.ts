import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SubCategory } from './sub-category.model';
import { SubCategoryPopupService } from './sub-category-popup.service';
import { SubCategoryService } from './sub-category.service';
import { Category, CategoryService } from '../category';
import { Offer, OfferService } from '../offer';
import { ServiceProvider, ServiceProviderService } from '../service-provider';
import { Merchant, MerchantService } from '../merchant';

@Component({
    selector: 'apsstr-sub-category-dialog',
    templateUrl: './sub-category-dialog.component.html'
})
export class SubCategoryDialogComponent implements OnInit {

    subCategory: SubCategory;
    isSaving: boolean;

    categories: Category[];

    offers: Offer[];

    serviceproviders: ServiceProvider[];

    merchants: Merchant[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private subCategoryService: SubCategoryService,
        private categoryService: CategoryService,
        private offerService: OfferService,
        private serviceProviderService: ServiceProviderService,
        private merchantService: MerchantService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.categoryService.query()
            .subscribe((res: HttpResponse<Category[]>) => { this.categories = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.offerService.query()
            .subscribe((res: HttpResponse<Offer[]>) => { this.offers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.serviceProviderService.query()
            .subscribe((res: HttpResponse<ServiceProvider[]>) => { this.serviceproviders = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.merchantService.query()
            .subscribe((res: HttpResponse<Merchant[]>) => { this.merchants = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.subCategory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.subCategoryService.update(this.subCategory));
        } else {
            this.subscribeToSaveResponse(
                this.subCategoryService.create(this.subCategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SubCategory>>) {
        result.subscribe((res: HttpResponse<SubCategory>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SubCategory) {
        this.eventManager.broadcast({ name: 'subCategoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCategoryById(index: number, item: Category) {
        return item.id;
    }

    trackOfferById(index: number, item: Offer) {
        return item.id;
    }

    trackServiceProviderById(index: number, item: ServiceProvider) {
        return item.id;
    }

    trackMerchantById(index: number, item: Merchant) {
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
    selector: 'apsstr-sub-category-popup',
    template: ''
})
export class SubCategoryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subCategoryPopupService: SubCategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.subCategoryPopupService
                    .open(SubCategoryDialogComponent as Component, params['id']);
            } else {
                this.subCategoryPopupService
                    .open(SubCategoryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
