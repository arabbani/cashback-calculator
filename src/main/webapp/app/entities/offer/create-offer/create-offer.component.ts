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
import { Categories, OfferTypes, ReturnTypes } from '../../../apsstr-core-ui-config';
import { ApsstrDialogService, FilterEntitiesService } from '../../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../../shared';
import { Affiliate, AffiliateService } from '../../affiliate';
import { Card, CardService } from '../../card';
import { CardType, CardTypeService } from '../../card-type';
import { Category, CategoryService } from '../../category';
import { Circle, CircleService } from '../../circle';
import { City, CityService } from '../../city';
import { Date as DateEntity, Date, DateService } from '../../date';
import { Day, DayService } from '../../day';
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
  refinedStates: State[];
  cities: City[];
  filteredCities: City[];
  refinedCities: City[];
  operatingSystems: OperatingSystem[];
  affiliates: Affiliate[];
  merchants: Merchant[];
  filteredMerchants: Merchant[];
  categories: Category[];
  subCategories: SubCategory[];
  filteredSubCategories: SubCategory[];
  refinedSubCategories: SubCategory[];
  serviceProviders: ServiceProvider[];
  filteredServiceProviders: ServiceProvider[];
  refinedServiceProviders: ServiceProvider[];
  circles: Circle[];
  filteredCircles: Circle[];
  reechargePlanTypes: ReechargePlanType[];
  travelTypes: TravelType[];
  regions: Region[];
  returnTypes: ReturnType[];
  returnModes: ReturnMode[];
  cards: Card[];
  filteredCards: Card[];
  refinedCards: Card[];
  offers: Offer[];
  filteredOffers: Offer[];
  cardTypes: CardType[];

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
  defaultPaymentMode;
  defaultCards;

  offerCategories: Category[];
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
    private route: ActivatedRoute, private location: Location, private filterEntitiesService: FilterEntitiesService) {
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
    this.defaultDate = 'Select Dates';
    this.defaultDay = 'Select Days';
    this.defaultState = 'Select States';
    this.defaultCity = 'Select Cities';
    this.defaultOperatingSystem = 'Select OS';
    this.defaultCategory = 'Select Categories';
    this.defaultSubCategory = 'Select Sub-Category';
    this.defaultServiceProvider = 'Select Service Provider';
    this.defaultCircle = 'Select Circles';
    this.defaultReechargePlanType = 'Select Reecharge Plan Type';
    this.defaultTravelType = 'Select Travel Types';
    this.defaultRegion = 'Select Regions';
    this.defaultOrigin = 'Select Origins';
    this.defaultPaymentMode = 'Select Payment Modes';
    this.defaultCards = 'Select Cards';
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
  }

  private extractRouteParams(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = false;
      this.offer = this.route.snapshot.data.offer;
      this.extractCategories();
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
        tab.disabled = true;
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
        this.refinedStates = this.states;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadCities(): void {
    this.cityService.query().subscribe(
      (res: HttpResponse<City[]>) => {
        this.cities = res.body;
        this.refinedCities = [];
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
        this.filteredMerchants = this.merchants;
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
        this.refinedSubCategories = [];
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadServiceProviders(): void {
    this.serviceProviderService.query().subscribe(
      (res: HttpResponse<ServiceProvider[]>) => {
        this.serviceProviders = res.body;
        this.refinedServiceProviders = [];
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadCircles(): void {
    this.circleService.query().subscribe(
      (res: HttpResponse<Circle[]>) => {
        this.circles = res.body;
        this.filteredCircles = this.circles;
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
        this.refinedCards = [];
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadOffersForReference(): void {
    this.offerService.query().subscribe(
      (res: HttpResponse<Offer[]>) => {
        this.offers = res.body;
        this.filteredOffers = this.offers;
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
    this.refinedCities = this.filteredCities;
  }

  onStateChange(states: State[]): void {
    this.filterCitiesForStates(states);
    this.offer.cities = this.filterEntitiesService.bySingleRelationId(states, this.offer.cities, 'state');
  }

  private filterSubCategoriesForCategories(categories: Category[]): void {
    this.filteredSubCategories = this.filterEntitiesService.bySingleRelationId(categories, this.subCategories, 'category');
    this.refinedSubCategories = this.filteredSubCategories;
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
    this.refinedServiceProviders = this.filteredServiceProviders;
  }

  onSubCategoryChange(subCategories: SubCategory[]): void {
    this.filterServiceProvidersForSubCategories(subCategories);
    this.offer.serviceProviders = this.filterEntitiesService.byManyRelationId(subCategories, this.offer.serviceProviders, 'subCategories');
  }

  private filterCardsForPaymentModes(modes: CardType[]): void {
    this.filteredCards = this.filterEntitiesService.bySingleRelationId(modes, this.cards, 'type');
    this.refinedCards = this.filteredCards;
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
        'exact': item.extras.exact,
        'minimumExpense': item.extras.minimumExpense,
        'maximumExpense': item.extras.maximumExpense,
        'minimumReturn': item.extras.minimumReturn,
        'maximumReturn': item.extras.maximumReturn,
        'minimumTicketRequired': item.extras.minimumTicketRequired,
        'minimumRideRequired': item.extras.minimumRideRequired
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
        'exact': item.extras.exact,
        'minimumExpense': item.extras.minimumExpense,
        'maximumExpense': item.extras.maximumExpense,
        'minimumReturn': item.extras.minimumReturn,
        'maximumReturn': item.extras.maximumReturn,
        'minimumTicketRequired': item.extras.minimumTicketRequired,
        'minimumRideRequired': item.extras.minimumRideRequired
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

  removeState(state: State): void {
    this.offer.states = _.pull(this.offer.states, state);
    this.onStateChange(this.offer.states);
  }

  removeCity(city: City): void {
    this.offer.cities = _.pull(this.offer.cities, city);
  }

  removeActiveDate(activeDate: DateEntity): void {
    this.offer.activeDates = _.pull(this.offer.activeDates, activeDate);
  }

  removeActiveDay(activeDay: Day): void {
    this.offer.activeDays = _.pull(this.offer.activeDays, activeDay);
  }

  removeOperatingSystem(operatingSystem: OperatingSystem): void {
    this.offer.operatingSystems = _.pull(this.offer.operatingSystems, operatingSystem);
  }

  removeCategory(category: Category): void {
    this.offerCategories = _.pull(this.offerCategories, category);
    this.onCategoryChange(this.offerCategories);
  }

  removeSubCategory(subCategory: SubCategory): void {
    this.offer.subCategories = _.pull(this.offer.subCategories, subCategory);
    this.onSubCategoryChange(this.offer.subCategories);
  }

  removeServiceProvider(serviceProvider: ServiceProvider): void {
    this.offer.serviceProviders = _.pull(this.offer.serviceProviders, serviceProvider);
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

  filterStates(value) {
    this.refinedStates = this.filterEntitiesService.byStringAttribute(this.states, 'name', value);
  }

  filterCities(value) {
    this.refinedCities = this.filterEntitiesService.byStringAttribute(this.filteredCities, 'name', value);
  }

  filterMerchants(value) {
    this.filteredMerchants = this.filterEntitiesService.byStringAttribute(this.merchants, 'name', value);
  }

  filterSubCategories(value) {
    this.refinedSubCategories = this.filterEntitiesService.byStringAttribute(this.filteredSubCategories, 'name', value);
  }

  filterServiceProviders(value) {
    this.refinedServiceProviders = this.filterEntitiesService.byStringAttribute(this.filteredServiceProviders, 'name', value);
  }

  filterCircles(value) {
    this.filteredCircles = this.filterEntitiesService.byStringAttribute(this.circles, 'name', value);
  }

  filterCards(value) {
    this.refinedCards = this.filterEntitiesService.byStringAttribute(this.filteredCards, 'name', value);
  }

  filterOffers(value) {
    this.filteredOffers = this.filterEntitiesService.byStringAttribute(this.offers, 'name', value);
  }

  onChangeStartDate(startDate: Date): void {
    if (startDate) {
      this.offer.startDate = startDate;
      this.minEndDate = startDate;
      this.offer.endDate = startDate;
    }
  }

  saveOffer(): void {
    this.isSaving = true;
    this.offer.startDate.setSeconds(0);
    this.offer.endDate.setSeconds(59);
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
