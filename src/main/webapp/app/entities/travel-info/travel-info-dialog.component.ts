import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TravelInfo } from './travel-info.model';
import { TravelInfoPopupService } from './travel-info-popup.service';
import { TravelInfoService } from './travel-info.service';
import { TravelType, TravelTypeService } from '../travel-type';
import { Region, RegionService } from '../region';

@Component({
    selector: 'apsstr-travel-info-dialog',
    templateUrl: './travel-info-dialog.component.html'
})
export class TravelInfoDialogComponent implements OnInit {

    travelInfo: TravelInfo;
    isSaving: boolean;

    traveltypes: TravelType[];

    regions: Region[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private travelInfoService: TravelInfoService,
        private travelTypeService: TravelTypeService,
        private regionService: RegionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.travelTypeService.query()
            .subscribe((res: HttpResponse<TravelType[]>) => { this.traveltypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.regionService.query()
            .subscribe((res: HttpResponse<Region[]>) => { this.regions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    trackTravelTypeById(index: number, item: TravelType) {
        return item.id;
    }

    trackRegionById(index: number, item: Region) {
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
