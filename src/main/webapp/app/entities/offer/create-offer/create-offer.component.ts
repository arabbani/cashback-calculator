import { Location } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { State as GridState } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { TabsetComponent } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';

import { Offer, OfferService } from '..';
import { ApsstrDialogService, FilterEntitiesService } from '../../../apsstr-core-ui/apsstr-core/services';
import { Categories, OfferTypes, ReturnTypes, SubCategories } from '../../../product';
import { GRID_STATE } from '../../../shared';
import { Affiliate, AffiliateService } from '../../affiliate';
import { BusInfo } from '../../bus-info';
import { Card, CardService } from '../../card';
import { CardType, CardTypeService } from '../../card-type';
import { Category, CategoryService } from '../../category';
import { Circle, CircleService } from '../../circle';
import { City, CityService } from '../../city';
import { Date as DateEntity, Date, DateService } from '../../date';
import { Day, DayService } from '../../day';
import { FlightClass, FlightClassService } from '../../flight-class';
import { FlightInfo } from '../../flight-info';
import { MainReturn } from '../../main-return';
import { Merchant, MerchantService } from '../../merchant';
import { OfferPayment } from '../../offer-payment';
import { OfferPolicy, OfferPolicyService } from '../../offer-policy';
import { OfferReturn } from '../../offer-return';
import { OfferType, OfferTypeService } from '../../offer-type';
import { OperatingSystem, OperatingSystemService } from '../../operating-system';
import { ReechargeInfo } from '../../reecharge-info';
import { ReechargePlanType, ReechargePlanTypeService } from '../../reecharge-plan-type';
import { Region, RegionService } from '../../region';
import { ReturnExtras } from '../../return-extras';
import { ReturnInfo } from '../../return-info';
import { ReturnMode, ReturnModeService } from '../../return-mode';
import { ReturnType, ReturnTypeService } from '../../return-type';
import { ServiceProvider, ServiceProviderService } from '../../service-provider';
import { State, StateService } from '../../state';
import { SubCategory, SubCategoryService } from '../../sub-category';
import { TravelInfo } from '../../travel-info';
import { TravelType, TravelTypeService } from '../../travel-type';

@Component({
  selector: 'apsstr-create-offer',
  templateUrl: './create-offer.component.html',
  styles: []
})
export class CreateOfferComponent implements OnInit {

  @ViewChild('createOfferTabs') createOfferTabs: TabsetComponent;
  offer: Offer;
  offerTypes: OfferType[];
  offerPolicies: OfferPolicy[];
  dates: DateEntity[];
  days: Day[];
  states: State[];
  cities: City[];
  filteredCities: City[];
  operatingSystems: OperatingSystem[];
  affiliates: Affiliate[];
  merchants: Merchant[];
  categories: Category[];
  subCategories: SubCategory[];
  filteredSubCategories: SubCategory[];
  serviceProviders: ServiceProvider[];
  filteredServiceProviders: ServiceProvider[];
  circles: Circle[];
  reechargePlanTypes: ReechargePlanType[];
  travelTypes: TravelType[];
  regions: Region[];
  returnTypes: ReturnType[];
  returnModes: ReturnMode[];
  cards: Card[];
  filteredCards: Card[];
  offers: Offer[];
  cardTypes: CardType[];
  flightClasses: FlightClass[];

  defaultDate;
  defaultDay;
  defaultState;
  defaultCity;
  defaultOperatingSystem;
  defaultCategory;
  defaultSubCategory;
  defaultServiceProvider;
  defaultCircle;
  defaultReechargePlanType;
  defaultTravelType;
  defaultRegion;
  defaultOrigin;

  offerCategories: Category[];
  offerStates: State[];
  categoryEnum;
  returnTypesEnum;
  offerReturnFormGroup: FormGroup;
  gridState: GridState;
  returnInfoFormGroup: FormGroup;
  isSaving: boolean;
  minStartDate: Date;
  minEndDate: Date;
  editMode: boolean;
  editedOffer: Offer;

  constructor(private offerService: OfferService, private offerTypeService: OfferTypeService, private offerPolicyService: OfferPolicyService, private dateService: DateService,
    private dayService: DayService, private stateService: StateService, private cityService: CityService,
    private operatingSystemService: OperatingSystemService, private affiliateService: AffiliateService, private merchantService: MerchantService,
    private categoryService: CategoryService, private subCategoryService: SubCategoryService, private serviceProviderService: ServiceProviderService,
    private circleService: CircleService, private travelTypeService: TravelTypeService, private regionService: RegionService, private formBuilder: FormBuilder,
    private apsstrKendoDialogService: ApsstrDialogService, private reechargePlanTypeService: ReechargePlanTypeService, private returnTypeService: ReturnTypeService,
    private returnModeService: ReturnModeService, private cardService: CardService, private cardTypeService: CardTypeService, private router: Router,
    private route: ActivatedRoute, private location: Location, private filterEntitiesService: FilterEntitiesService, private flightClassService: FlightClassService) {
    this.createOfferReturnFormGroup = this.createOfferReturnFormGroup.bind(this);
    this.createReturnInfoFormGroup = this.createReturnInfoFormGroup.bind(this);
  }

  ngOnInit() {
    this.initialize();
    this.extractRouteParams();
    // this.minStartDate = new Date();
    // this.minEndDate = this.minStartDate;
  }

  private initialize(): void {
    this.categoryEnum = Categories;
    this.returnTypesEnum = ReturnTypes;
    this.gridState = GRID_STATE;
    this.isSaving = false;
  }

  private initializeToEdit(): void {
    this.editMode = true;
    this.loadEntities();
  }

  private loadEntities() {
    this.loadOfferTypes();
    this.loadOfferPolicies();
    this.loadDates();
    this.loadDays();
    this.loadStates();
    this.loadCities();
    this.loadOperatingSystems();
    this.loadAffiliates();
    this.loadMerchants();
    this.loadCategories();
    this.loadSubCategories();
    this.loadServiceProviders();
    this.loadCircles();
    this.loadReechargePlanTypes();
    this.loadTravelTypes();
    this.loadRegions();
    this.loadReturnTypes();
    this.loadReturnModes();
    this.loadCards();
    this.loadOffersForReference();
    this.loadCardTypes();
    this.loadFlightClasses();
  }

  private extractRouteParams(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = false;
      this.offer = this.route.snapshot.data.offer;
      this.extractCategories();
      this.extractStates();
      const mode = this.route.snapshot.paramMap.get('edit');
      if (mode) {
        this.editOffer();
      }
    } else {
      this.initializeToEdit();
      this.createOffer();
    }
  }

  private enableTab(tabNumber: number): void {
    this.createOfferTabs.tabs[tabNumber].disabled = false;
  }

  private createOffer(): void {
    this.offer = new Offer();
    this.offer.offerReturns = [];
    _.forEach(this.createOfferTabs.tabs, (tab, index) => {
      if (index !== 0) {
        // tab.disabled = true;
      }
    });
    this.enableTab(0);
  }

  private extractCategories(): void {
    const categorySet = new Set();
    _.forEach(this.offer.subCategories, (subCategory) => {
      categorySet.add(subCategory.category);
    });
    this.offerCategories = _.toArray(categorySet);
  }

  private extractStates(): void {
    const stateSet = new Set();
    _.forEach(this.offer.cities, (city) => {
      stateSet.add(city.state);
    });
    this.offerStates = _.toArray(stateSet);
  }

  editOffer(): void {
    this.editedOffer = Object.assign({}, this.offer);
    this.initializeToEdit();
  }

  cancelEdit(): void {
    this.editMode = false;
    this.offer = Object.assign({}, this.editedOffer);
    this.editedOffer = undefined;
  }

  goBack(): void {
    this.location.back();
  }

  private loadOfferTypes(): void {
    this.offerTypeService.query().subscribe(
      (res: HttpResponse<OfferType[]>) => {
        this.offerTypes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadOfferPolicies(): void {
    this.offerPolicyService.query().subscribe(
      (res: HttpResponse<OfferPolicy[]>) => {
        this.offerPolicies = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadDates(): void {
    this.dateService.query().subscribe(
      (res: HttpResponse<DateEntity[]>) => {
        this.dates = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadDays(): void {
    this.dayService.query().subscribe(
      (res: HttpResponse<Day[]>) => {
        this.days = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadStates(): void {
    this.stateService.query().subscribe(
      (res: HttpResponse<State[]>) => {
        this.states = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadCities(): void {
    this.cityService.query().subscribe(
      (res: HttpResponse<City[]>) => {
        this.cities = res.body;
        this.filteredCities = [];
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadOperatingSystems(): void {
    this.operatingSystemService.query().subscribe(
      (res: HttpResponse<OperatingSystem[]>) => {
        this.operatingSystems = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadAffiliates(): void {
    this.affiliateService.query().subscribe(
      (res: HttpResponse<Affiliate[]>) => {
        this.affiliates = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadMerchants(): void {
    this.merchantService.query().subscribe(
      (res: HttpResponse<Merchant[]>) => {
        this.merchants = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadCategories(): void {
    this.categoryService.query().subscribe(
      (res: HttpResponse<Category[]>) => {
        this.categories = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadSubCategories(): void {
    this.subCategoryService.query().subscribe(
      (res: HttpResponse<SubCategory[]>) => {
        this.subCategories = res.body;
        this.filteredSubCategories = [];
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadServiceProviders(): void {
    this.serviceProviderService.query().subscribe(
      (res: HttpResponse<ServiceProvider[]>) => {
        this.serviceProviders = res.body;
        this.filteredServiceProviders = [];
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadCircles(): void {
    this.circleService.query().subscribe(
      (res: HttpResponse<Circle[]>) => {
        this.circles = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadReechargePlanTypes(): void {
    this.reechargePlanTypeService.query().subscribe(
      (res: HttpResponse<ReechargePlanType[]>) => {
        this.reechargePlanTypes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadTravelTypes(): void {
    this.travelTypeService.query().subscribe(
      (res: HttpResponse<TravelType[]>) => {
        this.travelTypes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadRegions(): void {
    this.regionService.query().subscribe(
      (res: HttpResponse<Region[]>) => {
        this.regions = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadReturnTypes(): void {
    this.returnTypeService.query().subscribe(
      (res: HttpResponse<ReturnType[]>) => {
        this.returnTypes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadReturnModes(): void {
    this.returnModeService.query().subscribe(
      (res: HttpResponse<ReturnMode[]>) => {
        this.returnModes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadCards(): void {
    this.cardService.query().subscribe(
      (res: HttpResponse<Card[]>) => {
        this.cards = res.body;
        this.filteredCards = [];
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadFlightClasses(): void {
    this.flightClassService.query().subscribe(
      (res: HttpResponse<FlightClass[]>) => {
        this.flightClasses = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadOffersForReference(): void {
    this.offerService.query().subscribe(
      (res: HttpResponse<Offer[]>) => {
        this.offers = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadCardTypes(): void {
    this.cardTypeService.query().subscribe(
      (res: HttpResponse<CardType[]>) => {
        this.cardTypes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  isCoupon(offerType: OfferType): boolean {
    switch (offerType.name) {
      case OfferTypes.COUPON:
      case OfferTypes.LDC:
        return true;
      case OfferTypes.DEAL:
      case OfferTypes.LDD:
        return false;
      default:
        return false;
    }
  }

  private filterCitiesForStates(states: State[]): void {
    this.filteredCities = this.filterEntitiesService.bySingleRelationId(states, this.cities, 'state');
  }

  onStateChange(states: State[]): void {
    this.filterCitiesForStates(states);
    this.offer.cities = this.filterEntitiesService.bySingleRelationId(states, this.offer.cities, 'state');
  }

  private filterSubCategoriesForCategories(categories: Category[]): void {
    this.filteredSubCategories = this.filterEntitiesService.bySingleRelationId(categories, this.subCategories, 'category');
  }

  onCategoryChange(categories: Category[]): void {
    this.filterSubCategoriesForCategories(categories);
    this.offer.subCategories = this.filterEntitiesService.bySingleRelationId(categories, this.offer.subCategories, 'category');
    this.onSubCategoryChange(this.offer.subCategories);
    _.forEach(categories, (category) => {
      switch (category.name) {
        case this.categoryEnum.REECHARGE:
          if (!this.offer.reechargeInfo) {
            this.offer.reechargeInfo = new ReechargeInfo();
          }
          break;
        case this.categoryEnum.TRAVEL:
          if (!this.offer.travelInfo) {
            this.offer.travelInfo = new TravelInfo();
          }
          break;
      }
    });
  }

  private filterServiceProvidersForSubCategories(subCategories: SubCategory[]): void {
    this.filteredServiceProviders = this.filterEntitiesService.byManyRelationId(subCategories, this.serviceProviders, 'subCategories');
  }

  onSubCategoryChange(subCategories: SubCategory[]): void {
    this.filterServiceProvidersForSubCategories(subCategories);
    this.offer.serviceProviders = this.filterEntitiesService.byManyRelationId(subCategories, this.offer.serviceProviders, 'subCategories');
  }

  private filterCardsForPaymentModes(modes: CardType[]): void {
    this.filteredCards = this.filterEntitiesService.bySingleRelationId(modes, this.cards, 'type');
  }

  onPaymentModeChange(modes: CardType[], dataItem): void {
    this.filterCardsForPaymentModes(modes);
    dataItem.payment.cards = this.filterEntitiesService.bySingleRelationId(modes, dataItem.payment.cards, 'type');
  }

  public createOfferReturnFormGroup(args: any): FormGroup {
    let item;
    if (args.isNew) {
      const offerReturn = new OfferReturn();
      offerReturn.extras = new ReturnExtras();
      item = offerReturn;
    } else {
      item = args.dataItem;
    }
    this.offerReturnFormGroup = this.formBuilder.group({
      'id': item.id,
      'extras': this.formBuilder.group({
        'minimumExpense': item.extras.minimumExpense,
        'maximumExpense': item.extras.maximumExpense,
        'minimumReturn': item.extras.minimumReturn,
        'maximumReturn': item.extras.maximumReturn,
        'minimumTicketRequired': item.extras.minimumTicketRequired
      })
    });
    return this.offerReturnFormGroup;
  }

  public createReturnInfoFormGroup(args: any): FormGroup {
    let item;
    if (args.isNew) {
      const returnInfo = new ReturnInfo();
      returnInfo.extras = new ReturnExtras();
      item = returnInfo;
    } else {
      item = args.dataItem;
    }
    this.returnInfoFormGroup = this.formBuilder.group({
      'id': item.id,
      'extras': this.formBuilder.group({
        'minimumExpense': item.extras.minimumExpense,
        'maximumExpense': item.extras.maximumExpense,
        'minimumReturn': item.extras.minimumReturn,
        'maximumReturn': item.extras.maximumReturn,
        'minimumTicketRequired': item.extras.minimumTicketRequired
      })
    });
    return this.returnInfoFormGroup;
  }

  public saveOfferReturn(offerReturn): void {
    if (!offerReturn.returnInfos) {
      offerReturn.returnInfos = [];
    }
  }

  public saveReturnInfo(returnInfo): void {
    if (!returnInfo.mainReturn) {
      returnInfo.mainReturn = new MainReturn();
    }
    if (!returnInfo.payment) {
      returnInfo.payment = new OfferPayment();
    }
  }

  public deleteOfferReturn(dataItem: any): void {
    this.apsstrKendoDialogService.confirm().subscribe((result) => {
      if (result['text'] === 'No') {
        this.offer.offerReturns.push(dataItem);
        this.offer.offerReturns = _.sortBy(this.offer.offerReturns, (item) => item.id);
      }
    });
  }

  public deleteReturnInfo(event: any): void {
    this.apsstrKendoDialogService.confirm().subscribe((result) => {
      if (result['text'] === 'No') {
        console.log(event);
        // event.sender.data['data'].push(event.dataItem);
        // event.sender.data.data = _.sortBy(event.data, (item) => item.id);
      }
    });
  }

  removePaymentCard(dataItem, card: Card): void {
    dataItem.payment.cards = _.pull(dataItem.payment.cards, card);
  }

  goToNextTab(tabNumber: number): void {
    this.enableTab(tabNumber);
    this.createOfferTabs.tabs[tabNumber].active = true;
  }

  goToPreviousTab(tabNumber: number): void {
    this.createOfferTabs.tabs[tabNumber].active = true;
  }

  onChangeStartDate(startDate: Date): void {
    if (startDate) {
      this.offer.startDate = startDate;
      this.minEndDate = startDate;
      this.offer.endDate = startDate;
    }
  }

  selectAllCities(): void {
    this.offer.cities = _.cloneDeep(this.filteredCities);
  }

  unselectAllCities(): void {
    this.offer.cities = [];
  }

  selectAllOS(): void {
    this.offer.operatingSystems = _.cloneDeep(this.operatingSystems);
  }

  unselectAllOS(): void {
    this.offer.operatingSystems = [];
  }

  selectAllServiceProviders(): void {
    this.offer.serviceProviders = _.cloneDeep(this.filteredServiceProviders);
  }

  unselectAllServiceProviders(): void {
    this.offer.serviceProviders = [];
  }

  selectAllCircles(): void {
    this.offer.reechargeInfo['circles'] = _.cloneDeep(this.circles);
  }

  unselectAllCircles(): void {
    this.offer.reechargeInfo['circles'] = [];
  }

  selectAllReechargeTypes(): void {
    this.offer.reechargeInfo['reechargePlanTypes'] = _.cloneDeep(this.circles);
  }

  unselectAllReechargeTypes(): void {
    this.offer.reechargeInfo['reechargePlanTypes'] = [];
  }

  selectAllStates(): void {
    this.offerStates = _.cloneDeep(this.states);
    this.onStateChange(this.offerStates);
  }

  unselectAllStates(): void {
    this.offerStates = [];
    this.onStateChange(this.offerStates);
  }

  isFlight(): boolean {
    const found = _.find(this.offer.subCategories, (subCategory) => subCategory.code === SubCategories.Flight);
    if (found) {
      if (!this.offer.travelInfo['flightInfo']) {
        this.offer.travelInfo['flightInfo'] = new FlightInfo();
      }
      return true;
    } else {
      this.offer.travelInfo['flightInfo'] = undefined;
      return false;
    }
  }

  isBus(): boolean {
    const found = _.find(this.offer.subCategories, (subCategory) => subCategory.code === SubCategories.Bus);
    if (found) {
      if (!this.offer.travelInfo['busInfo']) {
        this.offer.travelInfo['busInfo'] = new BusInfo();
      }
      return true;
    } else {
      this.offer.travelInfo['busInfo'] = undefined;
      return false;
    }
  }

  saveOffer(): void {
    this.isSaving = true;
    this.offer.startDate.setSeconds(0);
    this.offer.endDate.setSeconds(59);
    _.forEach(this.offer.offerReturns, (offerReturn) => {
      _.forEach(offerReturn.returnInfos, (returnInfo) => {
        delete returnInfo.payment.modes;
      });
    });
    console.log(this.offer);
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
    this.isSaving = false;
    this.router.navigate(['/offers']);
  }

  private onSaveError() {
    this.isSaving = false;
    this.apsstrKendoDialogService.error();
  }

  private onError(error) {
    console.log('ERROR');
  }

}
