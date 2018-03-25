import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FlightInfo } from './flight-info.model';
import { FlightInfoPopupService } from './flight-info-popup.service';
import { FlightInfoService } from './flight-info.service';
import { Region, RegionService } from '../region';
import { FlightClass, FlightClassService } from '../flight-class';

@Component({
    selector: 'apsstr-flight-info-dialog',
    templateUrl: './flight-info-dialog.component.html'
})
export class FlightInfoDialogComponent implements OnInit {

    flightInfo: FlightInfo;
    isSaving: boolean;

    regions: Region[];

    flightclasses: FlightClass[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private flightInfoService: FlightInfoService,
        private regionService: RegionService,
        private flightClassService: FlightClassService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.regionService.query()
            .subscribe((res: HttpResponse<Region[]>) => { this.regions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.flightClassService.query()
            .subscribe((res: HttpResponse<FlightClass[]>) => { this.flightclasses = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.flightInfo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.flightInfoService.update(this.flightInfo));
        } else {
            this.subscribeToSaveResponse(
                this.flightInfoService.create(this.flightInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FlightInfo>>) {
        result.subscribe((res: HttpResponse<FlightInfo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FlightInfo) {
        this.eventManager.broadcast({ name: 'flightInfoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRegionById(index: number, item: Region) {
        return item.id;
    }

    trackFlightClassById(index: number, item: FlightClass) {
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
    selector: 'apsstr-flight-info-popup',
    template: ''
})
export class FlightInfoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private flightInfoPopupService: FlightInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.flightInfoPopupService
                    .open(FlightInfoDialogComponent as Component, params['id']);
            } else {
                this.flightInfoPopupService
                    .open(FlightInfoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
