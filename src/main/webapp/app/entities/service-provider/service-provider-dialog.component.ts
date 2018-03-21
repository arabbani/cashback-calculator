import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ServiceProvider } from './service-provider.model';
import { ServiceProviderPopupService } from './service-provider-popup.service';
import { ServiceProviderService } from './service-provider.service';
import { SubCategory, SubCategoryService } from '../sub-category';
import { Offer, OfferService } from '../offer';

@Component({
    selector: 'apsstr-service-provider-dialog',
    templateUrl: './service-provider-dialog.component.html'
})
export class ServiceProviderDialogComponent implements OnInit {

    serviceProvider: ServiceProvider;
    isSaving: boolean;

    subcategories: SubCategory[];

    offers: Offer[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private serviceProviderService: ServiceProviderService,
        private subCategoryService: SubCategoryService,
        private offerService: OfferService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.subCategoryService.query()
            .subscribe((res: HttpResponse<SubCategory[]>) => { this.subcategories = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.offerService.query()
            .subscribe((res: HttpResponse<Offer[]>) => { this.offers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.serviceProvider.id !== undefined) {
            this.subscribeToSaveResponse(
                this.serviceProviderService.update(this.serviceProvider));
        } else {
            this.subscribeToSaveResponse(
                this.serviceProviderService.create(this.serviceProvider));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ServiceProvider>>) {
        result.subscribe((res: HttpResponse<ServiceProvider>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ServiceProvider) {
        this.eventManager.broadcast({ name: 'serviceProviderListModification', content: 'OK'});
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

    trackOfferById(index: number, item: Offer) {
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
    selector: 'apsstr-service-provider-popup',
    template: ''
})
export class ServiceProviderPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private serviceProviderPopupService: ServiceProviderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.serviceProviderPopupService
                    .open(ServiceProviderDialogComponent as Component, params['id']);
            } else {
                this.serviceProviderPopupService
                    .open(ServiceProviderDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
