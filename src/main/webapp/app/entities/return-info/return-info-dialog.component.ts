import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ReturnInfo } from './return-info.model';
import { ReturnInfoPopupService } from './return-info-popup.service';
import { ReturnInfoService } from './return-info.service';
import { MainReturn, MainReturnService } from '../main-return';
import { ReturnExtras, ReturnExtrasService } from '../return-extras';
import { ReturnType, ReturnTypeService } from '../return-type';
import { Offer, OfferService } from '../offer';
import { OfferReturn, OfferReturnService } from '../offer-return';

@Component({
    selector: 'apsstr-return-info-dialog',
    templateUrl: './return-info-dialog.component.html'
})
export class ReturnInfoDialogComponent implements OnInit {

    returnInfo: ReturnInfo;
    isSaving: boolean;

    mainreturns: MainReturn[];

    extras: ReturnExtras[];

    returntypes: ReturnType[];

    offers: Offer[];

    offerreturns: OfferReturn[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private returnInfoService: ReturnInfoService,
        private mainReturnService: MainReturnService,
        private returnExtrasService: ReturnExtrasService,
        private returnTypeService: ReturnTypeService,
        private offerService: OfferService,
        private offerReturnService: OfferReturnService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.mainReturnService
            .query({filter: 'returninfo-is-null'})
            .subscribe((res: HttpResponse<MainReturn[]>) => {
                if (!this.returnInfo.mainReturn || !this.returnInfo.mainReturn.id) {
                    this.mainreturns = res.body;
                } else {
                    this.mainReturnService
                        .find(this.returnInfo.mainReturn.id)
                        .subscribe((subRes: HttpResponse<MainReturn>) => {
                            this.mainreturns = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.returnExtrasService
            .query({filter: 'returninfo-is-null'})
            .subscribe((res: HttpResponse<ReturnExtras[]>) => {
                if (!this.returnInfo.extras || !this.returnInfo.extras.id) {
                    this.extras = res.body;
                } else {
                    this.returnExtrasService
                        .find(this.returnInfo.extras.id)
                        .subscribe((subRes: HttpResponse<ReturnExtras>) => {
                            this.extras = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.returnTypeService.query()
            .subscribe((res: HttpResponse<ReturnType[]>) => { this.returntypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.offerService.query()
            .subscribe((res: HttpResponse<Offer[]>) => { this.offers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.offerReturnService.query()
            .subscribe((res: HttpResponse<OfferReturn[]>) => { this.offerreturns = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.returnInfo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.returnInfoService.update(this.returnInfo));
        } else {
            this.subscribeToSaveResponse(
                this.returnInfoService.create(this.returnInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ReturnInfo>>) {
        result.subscribe((res: HttpResponse<ReturnInfo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ReturnInfo) {
        this.eventManager.broadcast({ name: 'returnInfoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMainReturnById(index: number, item: MainReturn) {
        return item.id;
    }

    trackReturnExtrasById(index: number, item: ReturnExtras) {
        return item.id;
    }

    trackReturnTypeById(index: number, item: ReturnType) {
        return item.id;
    }

    trackOfferById(index: number, item: Offer) {
        return item.id;
    }

    trackOfferReturnById(index: number, item: OfferReturn) {
        return item.id;
    }
}

@Component({
    selector: 'apsstr-return-info-popup',
    template: ''
})
export class ReturnInfoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private returnInfoPopupService: ReturnInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.returnInfoPopupService
                    .open(ReturnInfoDialogComponent as Component, params['id']);
            } else {
                this.returnInfoPopupService
                    .open(ReturnInfoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
