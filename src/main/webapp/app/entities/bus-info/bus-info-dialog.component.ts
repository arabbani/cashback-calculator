import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BusInfo } from './bus-info.model';
import { BusInfoPopupService } from './bus-info-popup.service';
import { BusInfoService } from './bus-info.service';
import { City, CityService } from '../city';

@Component({
    selector: 'apsstr-bus-info-dialog',
    templateUrl: './bus-info-dialog.component.html'
})
export class BusInfoDialogComponent implements OnInit {

    busInfo: BusInfo;
    isSaving: boolean;

    cities: City[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private busInfoService: BusInfoService,
        private cityService: CityService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cityService.query()
            .subscribe((res: HttpResponse<City[]>) => { this.cities = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.busInfo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.busInfoService.update(this.busInfo));
        } else {
            this.subscribeToSaveResponse(
                this.busInfoService.create(this.busInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BusInfo>>) {
        result.subscribe((res: HttpResponse<BusInfo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BusInfo) {
        this.eventManager.broadcast({ name: 'busInfoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCityById(index: number, item: City) {
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
    selector: 'apsstr-bus-info-popup',
    template: ''
})
export class BusInfoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private busInfoPopupService: BusInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.busInfoPopupService
                    .open(BusInfoDialogComponent as Component, params['id']);
            } else {
                this.busInfoPopupService
                    .open(BusInfoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
