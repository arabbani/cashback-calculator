import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TravelInfo } from './travel-info.model';
import { TravelInfoPopupService } from './travel-info-popup.service';
import { TravelInfoService } from './travel-info.service';
import { FlightInfo, FlightInfoService } from '../flight-info';
import { BusInfo, BusInfoService } from '../bus-info';
import { TravelType, TravelTypeService } from '../travel-type';

@Component({
    selector: 'apsstr-travel-info-dialog',
    templateUrl: './travel-info-dialog.component.html'
})
export class TravelInfoDialogComponent implements OnInit {

    travelInfo: TravelInfo;
    isSaving: boolean;

    flightinfos: FlightInfo[];

    businfos: BusInfo[];

    traveltypes: TravelType[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private travelInfoService: TravelInfoService,
        private flightInfoService: FlightInfoService,
        private busInfoService: BusInfoService,
        private travelTypeService: TravelTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.flightInfoService
            .query({filter: 'travelinfo-is-null'})
            .subscribe((res: HttpResponse<FlightInfo[]>) => {
                if (!this.travelInfo.flightInfo || !this.travelInfo.flightInfo.id) {
                    this.flightinfos = res.body;
                } else {
                    this.flightInfoService
                        .find(this.travelInfo.flightInfo.id)
                        .subscribe((subRes: HttpResponse<FlightInfo>) => {
                            this.flightinfos = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.busInfoService
            .query({filter: 'travelinfo-is-null'})
            .subscribe((res: HttpResponse<BusInfo[]>) => {
                if (!this.travelInfo.busInfo || !this.travelInfo.busInfo.id) {
                    this.businfos = res.body;
                } else {
                    this.busInfoService
                        .find(this.travelInfo.busInfo.id)
                        .subscribe((subRes: HttpResponse<BusInfo>) => {
                            this.businfos = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.travelTypeService.query()
            .subscribe((res: HttpResponse<TravelType[]>) => { this.traveltypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.travelInfo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.travelInfoService.update(this.travelInfo));
        } else {
            this.subscribeToSaveResponse(
                this.travelInfoService.create(this.travelInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TravelInfo>>) {
        result.subscribe((res: HttpResponse<TravelInfo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TravelInfo) {
        this.eventManager.broadcast({ name: 'travelInfoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFlightInfoById(index: number, item: FlightInfo) {
        return item.id;
    }

    trackBusInfoById(index: number, item: BusInfo) {
        return item.id;
    }

    trackTravelTypeById(index: number, item: TravelType) {
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
    selector: 'apsstr-travel-info-popup',
    template: ''
})
export class TravelInfoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private travelInfoPopupService: TravelInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.travelInfoPopupService
                    .open(TravelInfoDialogComponent as Component, params['id']);
            } else {
                this.travelInfoPopupService
                    .open(TravelInfoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
