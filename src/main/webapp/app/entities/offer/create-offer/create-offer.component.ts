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
import { Merchant, MerchantService } from '../../merchant';
import { OfferPolicy, OfferPolicyService } from '../../offer-policy';
import { OfferType, OfferTypeService } from '../../offer-type';
import { OperatingSystem, OperatingSystemService } from '../../operating-system';
import { RechargeInfo } from '../../recharge-info';
import { RechargePlanType, RechargePlanTypeService } from '../../recharge-plan-type';
import { Region, RegionService } from '../../region';
import { ReturnMode, ReturnModeService } from '../../return-mode';
import { ReturnType, ReturnTypeService } from '../../return-type';
import { ServiceProvider, ServiceProviderService } from '../../service-provider';
import { State, StateService } from '../../state';
import { SubCategory, SubCategoryService } from '../../sub-category';
import { TravelInfo } from '../../travel-info';
import { TravelType, TravelTypeService } from '../../travel-type';
import { OfferReturn, ReturnExtras, ReturnInfo, OfferPayment } from '../..';
import { MainReturn } from '../../main-return';

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
  rechargePlanTypes: RechargePlanType[];
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
  defaultRechargePlanType;
  defaultTravelType;
  defaultRegion;
  defaultOrigin;

  isCoupon: boolean;
  isFlight: boolean;
  isBus: boolean;
  isRechargeExtra: boolean;
  offerCategories: Category[];
  offerStates: State[];
  categoryEnum;
  subCategoryEnum;
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
    private apsstrDialogService: ApsstrDialogService, private rechargePlanTypeService: RechargePlanTypeService, private returnTypeService: ReturnTypeService,
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
    this.subCategoryEnum = SubCategories;
    this.gridState = GRID_STATE;
    this.isSaving = false;
    this.isFlight = false;
    this.isBus = false;
    this.isRechargeExtra = false;
  }

  private initializeToEdit(): void {
    this.editMode = true;
    this.loadEssentialEntities();
  }

  private loadEssentialEntities() {
    this.loadOfferTypes();
    this.loadOfferPolicies();
  }

  private loadTabTwoEntities() {
    if (!this.dates) {
      this.loadDates();
    }
    if (!this.days) {
      this.loadDays();
    }
    if (!this.states) {
      this.loadStates();
    }
    if (!this.cities) {
      this.loadCities();
    }
    if (!this.operatingSystems) {
      this.loadOperatingSystems();
    }
    if (!this.affiliates) {
      this.loadAffiliates();
    }
    if (!this.merchants) {
      this.loadMerchants();
    }
  }

  private loadTabThreeEntities() {
    if (!this.categories) {
      this.loadCategories();
    }
    if (!this.subCategories) {
      this.loadSubCategories();
    }
    if (!this.serviceProviders) {
      this.loadServiceProviders();
    }
  }

  private loadTabFourEntities() {
    if (!this.returnTypes) {
      this.loadReturnTypes();
    }
    if (!this.returnModes) {
      this.loadReturnModes();
    }
    if (!this.cards) {
      this.loadCards();
    }
    if (!this.offers) {
      this.loadOffersForReference();
    }
    if (!this.cardTypes) {
      this.loadCardTypes();
    }

  }

  private loadRechargeEntities() {
    if (!this.circles) {
      this.loadCircles();
    }
    if (!this.rechargePlanTypes) {
      this.loadRechargePlanTypes();
    }
  }

  private loadTravelEntities() {
    if (!this.travelTypes) {
      this.loadTravelTypes();
    }
  }

  private loadFlightEntities(): void {
    if (!this.regions) {
      this.loadRegions();
    }
    if (!this.flightClasses) {
      this.loadFlightClasses();
    }
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
      this.isCoupon = false;
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
        tab.disabled = true;
      }
    });
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
    this.goToTab(0);
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

  onSelectTab(tabNumber: number): void {
    switch (tabNumber) {
      case 2:
        if (this.editMode) {
          this.loadTabTwoEntities();
        }
        break;
      case 3:
        if (this.editMode) {
          this.loadTabThreeEntities();
        }
        this.setUpSubCategoriesToEdit(this.offer.subCategories);
        break;
      case 4:
        if (this.editMode) {
          this.loadTabFourEntities();
        }
        break;
      default:
        break;
    }
  }

  goToNextTab(tabNumber: number): void {
    if (this.createOfferTabs.tabs[tabNumber].disabled) {
      this.enableTab(tabNumber);
    }
    this.goToTab(tabNumber);
  }

  goToTab(tabNumber: number): void {
    this.createOfferTabs.tabs[tabNumber].active = true;
  }

  private setUpSubCategoriesToEdit(subCategories: SubCategory[]): void {
    this.isFlight = false;
    this.isBus = false;
    this.isRechargeExtra = false;
    _.forEach(subCategories, (subCategory) => {
      switch (subCategory.code) {
        case this.subCategoryEnum.PrepaidMobile:
        case this.subCategoryEnum.PostpaidMobile:
        case this.subCategoryEnum.PrepaidDatacard:
        case this.subCategoryEnum.PostpaidDatacard:
        case this.subCategoryEnum.Broadband:
          this.loadRechargeEntities();
          this.isRechargeExtra = true;
          if (!this.offer.rechargeInfo) {
            this.offer.rechargeInfo = new RechargeInfo();
            if (this.offer.id !== undefined) {
              this.loadRechargeInfo();
            }
          }
          break;
        case this.subCategoryEnum.Flight:
          this.loadTravelEntities();
          this.loadFlightEntities();
          if (!this.offer.travelInfo) {
            this.offer.travelInfo = new TravelInfo();
          }
          if (!this.offer.travelInfo['flightInfo']) {
            this.offer.travelInfo['flightInfo'] = new FlightInfo();
            if (this.offer.id !== undefined) {
              this.loadFlightInfo();
            }
          }
          this.isFlight = true;
          break;
        case this.subCategoryEnum.Bus:
          this.loadTravelEntities();
          if (!this.offer.travelInfo) {
            this.offer.travelInfo = new TravelInfo();
          }
          if (!this.offer.travelInfo['busInfo']) {
            this.offer.travelInfo['busInfo'] = new BusInfo();
            if (this.offer.id !== undefined) {
              this.loadBusInfo();
            }
          }
          this.isBus = true;
          break;
        default:
          break;
      }
    });
  }

  onOfferTypeChange(offerType: OfferType): void {
    switch (offerType.name) {
      case OfferTypes.COUPON:
      case OfferTypes.LDC:
        this.isCoupon = true;
        break;
      case OfferTypes.DEAL:
      case OfferTypes.LDD:
        this.isCoupon = false;
    }
  }

  onChangeStartDate(startDate: Date): void {
    if (startDate) {
      this.offer.startDate = startDate;
      this.minEndDate = startDate;
      this.offer.endDate = startDate;
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
  }

  private filterServiceProvidersForSubCategories(subCategories: SubCategory[]): void {
    this.filteredServiceProviders = this.filterEntitiesService.byManyRelationId(subCategories, this.serviceProviders, 'subCategories');
  }

  onSubCategoryChange(subCategories: SubCategory[]): void {
    this.setUpSubCategoriesToEdit(this.offer.subCategories);
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
    this.apsstrDialogService.confirm().subscribe((result) => {
      if (result['text'] === 'No') {
        this.offer.offerReturns.push(dataItem);
        this.offer.offerReturns = _.sortBy(this.offer.offerReturns, (item) => item.id);
      }
    });
  }

  public deleteReturnInfo(event: any): void {
    this.apsstrDialogService.confirm().subscribe((result) => {
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

  selectAllStates(): void {
    this.offerStates = _.cloneDeep(this.states);
    this.onStateChange(this.offerStates);
  }

  unselectAllStates(): void {
    this.offerStates = [];
    this.onStateChange(this.offerStates);
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

  selectAllSubCategories(): void {
    this.offer.subCategories = _.cloneDeep(this.filteredSubCategories);
    this.onSubCategoryChange(this.offer.subCategories);
  }

  unselectAllSubCategories(): void {
    this.offer.subCategories = [];
    this.onSubCategoryChange(this.offer.subCategories);
  }

  selectAllServiceProviders(): void {
    this.offer.serviceProviders = _.cloneDeep(this.filteredServiceProviders);
  }

  unselectAllServiceProviders(): void {
    this.offer.serviceProviders = [];
  }

  selectAllCircles(): void {
    this.offer.rechargeInfo['circles'] = _.cloneDeep(this.circles);
  }

  unselectAllCircles(): void {
    this.offer.rechargeInfo['circles'] = [];
  }

  selectAllRechargeTypes(): void {
    this.offer.rechargeInfo['rechargePlanTypes'] = _.cloneDeep(this.circles);
  }

  unselectAllRechargeTypes(): void {
    this.offer.rechargeInfo['rechargePlanTypes'] = [];
  }

  private refineOfferToSave(): void {
    // const of = Object.assign({}, this.offer);
    // console.log(of);
    this.offer.startDate.setSeconds(0);
    this.offer.endDate.setSeconds(59);
    _.forEach(this.offer.offerReturns, (offerReturn) => {
      _.forEach(offerReturn.returnInfos, (returnInfo) => {
        delete returnInfo.payment.modes;
      });
    });
    if (!this.isRechargeExtra) {
      this.offer.rechargeInfo = undefined;
    }
    if (!this.isFlight && !this.isBus) {
      this.offer.travelInfo = undefined;
    } else {
      if (!this.isFlight) {
        this.offer.travelInfo['flightInfo'] = undefined;
      }
      if (!this.isBus) {
        this.offer.travelInfo['busInfo'] = undefined;
      }
    }
    console.log(this.offer);
  }

  saveOffer(): void {
    this.isSaving = true;
    this.refineOfferToSave();
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
    this.apsstrDialogService.error();
  }

  private onError(error) {
    console.log('ERROR');
  }

  private loadOfferTypes(): void {
    this.offerTypeService.findAll().subscribe(
      (res: HttpResponse<OfferType[]>) => {
        this.offerTypes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadOfferPolicies(): void {
    this.offerPolicyService.findAll().subscribe(
      (res: HttpResponse<OfferPolicy[]>) => {
        this.offerPolicies = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadDates(): void {
    this.dateService.findAll().subscribe(
      (res: HttpResponse<DateEntity[]>) => {
        this.dates = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadDays(): void {
    this.dayService.findAll().subscribe(
      (res: HttpResponse<Day[]>) => {
        this.days = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadStates(): void {
    this.stateService.findAll().subscribe(
      (res: HttpResponse<State[]>) => {
        this.states = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadCities(): void {
    this.cityService.findWithState().subscribe(
      (res: HttpResponse<City[]>) => {
        this.cities = res.body;
        this.filteredCities = [];
        if (this.editMode && this.offer.id !== undefined) {
          this.onStateChange(this.offerStates);
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadOperatingSystems(): void {
    this.operatingSystemService.findAll().subscribe(
      (res: HttpResponse<OperatingSystem[]>) => {
        this.operatingSystems = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadAffiliates(): void {
    this.affiliateService.findAll().subscribe(
      (res: HttpResponse<Affiliate[]>) => {
        this.affiliates = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadMerchants(): void {
    this.merchantService.findWithSubCategories().subscribe(
      (res: HttpResponse<Merchant[]>) => {
        this.merchants = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadCategories(): void {
    this.categoryService.findAll().subscribe(
      (res: HttpResponse<Category[]>) => {
        this.categories = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadSubCategories(): void {
    this.subCategoryService.findWithCategory().subscribe(
      (res: HttpResponse<SubCategory[]>) => {
        this.subCategories = res.body;
        this.filteredSubCategories = [];
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadServiceProviders(): void {
    this.serviceProviderService.findWithSubCategories().subscribe(
      (res: HttpResponse<ServiceProvider[]>) => {
        this.serviceProviders = res.body;
        this.filteredServiceProviders = [];
        if (this.editMode && this.offer.id !== undefined) {
          this.onCategoryChange(this.offerCategories);
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadCircles(): void {
    this.circleService.findAll().subscribe(
      (res: HttpResponse<Circle[]>) => {
        this.circles = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadRechargePlanTypes(): void {
    this.rechargePlanTypeService.findAll().subscribe(
      (res: HttpResponse<RechargePlanType[]>) => {
        this.rechargePlanTypes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadTravelTypes(): void {
    this.travelTypeService.findAll().subscribe(
      (res: HttpResponse<TravelType[]>) => {
        this.travelTypes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadRegions(): void {
    this.regionService.findAll().subscribe(
      (res: HttpResponse<Region[]>) => {
        this.regions = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadFlightClasses(): void {
    this.flightClassService.findAll().subscribe(
      (res: HttpResponse<FlightClass[]>) => {
        this.flightClasses = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadRechargeInfo(): void {
    this.offerService.findRechargeInfoById(this.offer.id).subscribe(
      (res: HttpResponse<Offer>) => {
        const offer = res.body;
        this.offer.rechargeInfo = offer.rechargeInfo;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadFlightInfo(): void {
    this.offerService.findFlightInfoById(this.offer.id).subscribe(
      (res: HttpResponse<Offer>) => {
        const offer = res.body;
        if (offer.travelInfo) {
          this.offer.travelInfo['types'] = offer.travelInfo['types'];
          this.offer.travelInfo['flightInfo'] = offer.travelInfo['flightInfo'];
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadBusInfo(): void {
    this.offerService.findBusInfoById(this.offer.id).subscribe(
      (res: HttpResponse<Offer>) => {
        const offer = res.body;
        if (offer.travelInfo) {
          this.offer.travelInfo['types'] = offer.travelInfo['types'];
          this.offer.travelInfo['busInfo'] = offer.travelInfo['busInfo'];
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadReturnTypes(): void {
    this.returnTypeService.findAll().subscribe(
      (res: HttpResponse<ReturnType[]>) => {
        this.returnTypes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadReturnModes(): void {
    this.returnModeService.findAll().subscribe(
      (res: HttpResponse<ReturnMode[]>) => {
        this.returnModes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadCards(): void {
    this.cardService.findWithTypeAndProviders().subscribe(
      (res: HttpResponse<Card[]>) => {
        this.cards = res.body;
        this.filteredCards = [];
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadOffersForReference(): void {
    if (this.offer.id) {
      this.offerService.findAllForReferenceExclusive(this.offer.id).subscribe(
        (res: HttpResponse<Offer[]>) => {
          this.offers = res.body;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    } else {
      this.offerService.findAllForReference().subscribe(
        (res: HttpResponse<Offer[]>) => {
          this.offers = res.body;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    }
  }

  private loadCardTypes(): void {
    this.cardTypeService.findAll().subscribe(
      (res: HttpResponse<CardType[]>) => {
        this.cardTypes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

}
