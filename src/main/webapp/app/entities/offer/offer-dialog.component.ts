import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Offer } from './offer.model';
import { OfferPopupService } from './offer-popup.service';
import { OfferService } from './offer.service';
import { TravelInfo, TravelInfoService } from '../travel-info';
import { ReechargeInfo, ReechargeInfoService } from '../reecharge-info';
import { OfferPolicy, OfferPolicyService } from '../offer-policy';
import { OperatingSystem, OperatingSystemService } from '../operating-system';
import { State, StateService } from '../state';
import { City, CityService } from '../city';
import { SubCategory, SubCategoryService } from '../sub-category';
import { ServiceProvider, ServiceProviderService } from '../service-provider';
import { Date, DateService } from '../date';
import { Day, DayService } from '../day';
import { Affiliate, AffiliateService } from '../affiliate';
import { Merchant, MerchantService } from '../merchant';
import { OfferType, OfferTypeService } from '../offer-type';

@Component({
    selector: 'apsstr-offer-dialog',
    templateUrl: './offer-dialog.component.html'
})
export class OfferDialogComponent implements OnInit {

    offer: Offer;
    isSaving: boolean;

    travelinfos: TravelInfo[];

    reechargeinfos: ReechargeInfo[];

    offerpolicies: OfferPolicy[];

    operatingsystems: OperatingSystem[];

    states: State[];

    cities: City[];

    subcategories: SubCategory[];

    serviceproviders: ServiceProvider[];

    dates: Date[];

    days: Day[];

    affiliates: Affiliate[];

    merchants: Merchant[];

    offertypes: OfferType[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private offerService: OfferService,
        private travelInfoService: TravelInfoService,
        private reechargeInfoService: ReechargeInfoService,
        private offerPolicyService: OfferPolicyService,
        private operatingSystemService: OperatingSystemService,
        private stateService: StateService,
        private cityService: CityService,
        private subCategoryService: SubCategoryService,
        private serviceProviderService: ServiceProviderService,
        private dateService: DateService,
        private dayService: DayService,
        private affiliateService: AffiliateService,
        private merchantService: MerchantService,
        private offerTypeService: OfferTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.travelInfoService
            .query({filter: 'offer-is-null'})
            .subscribe((res: HttpResponse<TravelInfo[]>) => {
                if (!this.offer.travelInfo || !this.offer.travelInfo.id) {
                    this.travelinfos = res.body;
                } else {
                    this.travelInfoService
                        .find(this.offer.travelInfo.id)
                        .subscribe((subRes: HttpResponse<TravelInfo>) => {
                            this.travelinfos = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.reechargeInfoService
            .query({filter: 'offer-is-null'})
            .subscribe((res: HttpResponse<ReechargeInfo[]>) => {
                if (!this.offer.reechargeInfo || !this.offer.reechargeInfo.id) {
                    this.reechargeinfos = res.body;
                } else {
                    this.reechargeInfoService
                        .find(this.offer.reechargeInfo.id)
                        .subscribe((subRes: HttpResponse<ReechargeInfo>) => {
                            this.reechargeinfos = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.offerPolicyService.query()
            .subscribe((res: HttpResponse<OfferPolicy[]>) => { this.offerpolicies = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.operatingSystemService.query()
            .subscribe((res: HttpResponse<OperatingSystem[]>) => { this.operatingsystems = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.stateService.query()
            .subscribe((res: HttpResponse<State[]>) => { this.states = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cityService.query()
            .subscribe((res: HttpResponse<City[]>) => { this.cities = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.subCategoryService.query()
            .subscribe((res: HttpResponse<SubCategory[]>) => { this.subcategories = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.serviceProviderService.query()
            .subscribe((res: HttpResponse<ServiceProvider[]>) => { this.serviceproviders = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.dateService.query()
            .subscribe((res: HttpResponse<Date[]>) => { this.dates = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.dayService.query()
            .subscribe((res: HttpResponse<Day[]>) => { this.days = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.affiliateService.query()
            .subscribe((res: HttpResponse<Affiliate[]>) => { this.affiliates = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.merchantService.query()
            .subscribe((res: HttpResponse<Merchant[]>) => { this.merchants = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.offerTypeService.query()
            .subscribe((res: HttpResponse<OfferType[]>) => { this.offertypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.offer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.offerService.update(this.offer));
        } else {
            this.subscribeToSaveResponse(
                this.offerService.create(this.offer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Offer>>) {
        result.subscribe((res: HttpResponse<Offer>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Offer) {
        this.eventManager.broadcast({ name: 'offerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTravelInfoById(index: number, item: TravelInfo) {
        return item.id;
    }

    trackReechargeInfoById(index: number, item: ReechargeInfo) {
        return item.id;
    }

    trackOfferPolicyById(index: number, item: OfferPolicy) {
        return item.id;
    }

    trackOperatingSystemById(index: number, item: OperatingSystem) {
        return item.id;
    }

    trackStateById(index: number, item: State) {
        return item.id;
    }

    trackCityById(index: number, item: City) {
        return item.id;
    }

    trackSubCategoryById(index: number, item: SubCategory) {
        return item.id;
    }

    trackServiceProviderById(index: number, item: ServiceProvider) {
        return item.id;
    }

    trackDateById(index: number, item: Date) {
        return item.id;
    }

    trackDayById(index: number, item: Day) {
        return item.id;
    }

    trackAffiliateById(index: number, item: Affiliate) {
        return item.id;
    }

    trackMerchantById(index: number, item: Merchant) {
        return item.id;
    }

    trackOfferTypeById(index: number, item: OfferType) {
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
    selector: 'apsstr-offer-popup',
    template: ''
})
export class OfferPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private offerPopupService: OfferPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.offerPopupService
                    .open(OfferDialogComponent as Component, params['id']);
            } else {
                this.offerPopupService
                    .open(OfferDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
