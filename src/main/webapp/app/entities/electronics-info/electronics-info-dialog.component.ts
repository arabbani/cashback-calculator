import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ElectronicsInfo } from './electronics-info.model';
import { ElectronicsInfoPopupService } from './electronics-info-popup.service';
import { ElectronicsInfoService } from './electronics-info.service';
import { Brand, BrandService } from '../brand';

@Component({
    selector: 'apsstr-electronics-info-dialog',
    templateUrl: './electronics-info-dialog.component.html'
})
export class ElectronicsInfoDialogComponent implements OnInit {

    electronicsInfo: ElectronicsInfo;
    isSaving: boolean;

    brands: Brand[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private electronicsInfoService: ElectronicsInfoService,
        private brandService: BrandService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.brandService.query()
            .subscribe((res: HttpResponse<Brand[]>) => { this.brands = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.electronicsInfo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.electronicsInfoService.update(this.electronicsInfo));
        } else {
            this.subscribeToSaveResponse(
                this.electronicsInfoService.create(this.electronicsInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ElectronicsInfo>>) {
        result.subscribe((res: HttpResponse<ElectronicsInfo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ElectronicsInfo) {
        this.eventManager.broadcast({ name: 'electronicsInfoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBrandById(index: number, item: Brand) {
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
    selector: 'apsstr-electronics-info-popup',
    template: ''
})
export class ElectronicsInfoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private electronicsInfoPopupService: ElectronicsInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.electronicsInfoPopupService
                    .open(ElectronicsInfoDialogComponent as Component, params['id']);
            } else {
                this.electronicsInfoPopupService
                    .open(ElectronicsInfoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
