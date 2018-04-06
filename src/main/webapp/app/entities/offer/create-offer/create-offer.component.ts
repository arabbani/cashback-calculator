import { Location } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { State as GridState } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { JhiEventManager } from 'ng-jhipster';
import { TabsetComponent } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';

import { Offer, OfferService } from '..';
import { Bank, BankService, OfferPayment, OfferReturn, ReturnExtras, ReturnInfo } from '../..';
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
  banks: Bank[];

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
  fetchedBusInfo: boolean;
  subscribed: boolean;

  constructor(private offerService: OfferService, private offerTypeService: OfferTypeService, private offerPolicyService: OfferPolicyService, private dateService: DateService,
    private dayService: DayService, private stateService: StateService, private cityService: CityService,
    private operatingSystemService: OperatingSystemService, private affiliateService: AffiliateService, private merchantService: MerchantService,
    private categoryService: CategoryService, private subCategoryService: SubCategoryService, private serviceProviderService: ServiceProviderService,
    private circleService: CircleService, private travelTypeService: TravelTypeService, private regionService: RegionService, private formBuilder: FormBuilder,
    private apsstrDialogService: ApsstrDialogService, private rechargePlanTypeService: RechargePlanTypeService, private returnTypeService: ReturnTypeService,
    private returnModeService: ReturnModeService, private cardService: CardService, private cardTypeService: CardTypeService, private router: Router,
    private route: ActivatedRoute, private location: Location, private filterEntitiesService: FilterEntitiesService, private flightClassService: FlightClassService,
    private bankService: BankService, private jhiEventManager: JhiEventManager) {
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
    this.fetchedBusInfo = false;
    this.subscribed = false;
  }

  private initializeToEdit(): void {
    this.editMode = true;
    this.loadOfferTypes();
  }

  private extractRouteParams(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = false;
      this.offer = this.route.snapshot.data.offer;
      this.onOfferTypeChange(this.offer.type);
      this.extractStates();
      const editMode = this.route.snapshot.paramMap.get('edit');
      if (editMode) {
        this.editOffer();
      }
    } else {
      this.isCoupon = false;
      this.initializeToEdit();
      this.createOffer();
    }
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

  editOffer(): void {
    this.editedOffer = _.cloneDeep(this.offer);
    // this.goToTab(0);
    this.initializeToEdit();
  }

  // cancelEdit(): void {
  //   this.editMode = false;
  //   this.offer = _.cloneDeep(this.editedOffer);
  //   this.editedOffer = undefined;
  // }

  private enableTab(tabNumber: number): void {
    this.createOfferTabs.tabs[tabNumber].disabled = false;
  }

  goToTab(tabNumber: number): void {
    this.createOfferTabs.tabs[tabNumber].active = true;
  }

  goToNextTab(tabNumber: number): void {
    if (this.createOfferTabs.tabs[tabNumber].disabled) {
      this.enableTab(tabNumber);
    }
    this.goToTab(tabNumber);
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
        if (!this.offerCategories && this.offer.id !== undefined) {
          this.extractCategories();
        }
        if (!this.subscribed) {
          this.subscribeToTabTwoEntity();
        }
        this.setUpSubCategoriesToEdit(this.offer.subCategories);
        break;
      case 3:
        if (this.editMode) {
          this.loadTabThreeEntities();
        }
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
        // case this.subCategoryEnum.Broadband:
          if (this.editMode) {
            this.loadRechargeEntities();
          }
          if (this.offer.id !== undefined && !this.offer.rechargeInfo) {
            this.loadRechargeInfo();
          } else if (!this.offer.rechargeInfo) {
            this.offer.rechargeInfo = new RechargeInfo();
            this.isRechargeExtra = true;
          } else {
            this.isRechargeExtra = true;
          }
          break;
        case this.subCategoryEnum.Flight:
          if (this.editMode) {
            this.loadTravelEntities();
            this.loadFlightEntities();
          }
          if (this.offer.id !== undefined) {
            if (!this.offer.travelInfo || !this.offer.travelInfo.flightInfo) {
              this.loadFlightInfo();
            } else {
              this.isFlight = true;
            }
          } else if (!this.offer.travelInfo) {
            this.offer.travelInfo = new TravelInfo();
            this.offer.travelInfo.flightInfo = new FlightInfo();
            this.isFlight = true;
          } else if (!this.offer.travelInfo.flightInfo) {
            this.offer.travelInfo.flightInfo = new FlightInfo();
            this.isFlight = true;
          }
          break;
        case this.subCategoryEnum.Bus:
          if (this.editMode) {
            this.loadTravelEntities();
            this.loadBusEntities();
          }
          if (this.offer.id !== undefined) {
            if (!this.fetchedBusInfo) {
              if (!this.offer.travelInfo || !this.offer.travelInfo.busInfo) {
                this.loadBusInfo();
              } else {
                this.isBus = true;
              }
            }
          } else if (!this.offer.travelInfo) {
            this.offer.travelInfo = new TravelInfo();
            this.offer.travelInfo.busInfo = new BusInfo();
            this.isBus = true;
          } else {
            if (!this.offer.travelInfo.busInfo) {
              this.offer.travelInfo.busInfo = new BusInfo();
            }
            this.isBus = true;
          }
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

  onCategoryChange(categories: Category[]): void {
    this.filteredSubCategories = this.filterEntitiesService.bySingleRelationIds(categories, this.subCategories, 'category');
    this.offer.subCategories = this.filterEntitiesService.bySingleRelationIds(categories, this.offer.subCategories, 'category');
    this.onSubCategoryChange(this.offer.subCategories);
  }

  onSubCategoryChange(subCategories: SubCategory[]): void {
    this.setUpSubCategoriesToEdit(this.offer.subCategories);
    this.filteredServiceProviders = this.filterEntitiesService.byManyRelationIds(subCategories, this.serviceProviders, 'subCategories');
    this.offer.serviceProviders = this.filterEntitiesService.byManyRelationIds(subCategories, this.offer.serviceProviders, 'subCategories');
  }

  private extractCategories(): void {
    const categorySet = new Set();
    _.forEach(this.offer.subCategories, (subCategory) => {
      categorySet.add(subCategory.category);
    });
    this.offerCategories = _.toArray(categorySet);
  }

  private subscribeToTabTwoEntity(): void {
    this.jhiEventManager.subscribe('tabTwoEntity', (response) => {
      if (this.subCategories && this.serviceProviders) {
        if (this.offer.id !== undefined) {
          this.onCategoryChange(this.offerCategories);
        }
      }
    });
    this.subscribed = true;
  }

  onBankChange(banks, dataItem): void {
    if (dataItem.payment.modes) {
      this.onPaymentModeChange(dataItem.payment.modes, dataItem);
    }
  }

  private filterCardsForBankAndPaymentMode(modes, dataItem): void {
    const bankCards = this.filterEntitiesService.bySingleRelationIds(dataItem.payment.banks, this.cards, 'bank');
    dataItem.payment['filteredCards'] = this.filterEntitiesService.bySingleRelationIds(modes, bankCards, 'type');
  }

  onPaymentModeChange(modes: CardType[], dataItem): void {
    this.filterCardsForBankAndPaymentMode(modes, dataItem);
    dataItem.payment.cards = _.intersectionBy(dataItem.payment.cards, dataItem.payment['filteredCards'], 'id');
  }

  extractBanksAndPaymentModesFromCards(): void {
    let bankSet;
    let paymentModeSet;
    _.forEach(this.offer.offerReturns, (offerReturn) => {
      _.forEach(offerReturn['returnInfos'], (returnInfo) => {
        bankSet = new Set();
        paymentModeSet = new Set();
        _.forEach(returnInfo.payment.cards, (card) => {
          bankSet.add(card.bank);
          paymentModeSet.add(card.type);
        });
        returnInfo.payment['banks'] = _.toArray(bankSet);
        returnInfo.payment['modes'] = _.toArray(paymentModeSet);
        this.filterCardsForBankAndPaymentMode(returnInfo.payment.modes, returnInfo);
      });
    });
  }

  private extractStates(): void {
    const stateSet = new Set();
    _.forEach(this.offer.cities, (city) => {
      stateSet.add(city.state);
    });
    this.offerStates = _.toArray(stateSet);
  }

  onStateChange(states: State[]): void {
    this.filteredCities = this.filterEntitiesService.bySingleRelationIds(states, this.cities, 'state');
    this.offer.cities = this.filterEntitiesService.bySingleRelationIds(states, this.offer.cities, 'state');
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

  public deleteOfferReturn(dataItem: any): void {
    this.apsstrDialogService.confirm().subscribe((result) => {
      if (result['text'] === 'No') {
        this.offer.offerReturns.push(dataItem);
        this.offer.offerReturns = _.sortBy(this.offer.offerReturns, (item) => item.id);
      }
    });
  }

  public saveReturnInfo(returnInfo): void {
    if (!returnInfo.mainReturn) {
      returnInfo.mainReturn = new MainReturn();
    }
    if (!returnInfo.payment) {
      returnInfo.payment = new OfferPayment();
    }
  }

  public deleteReturnInfo(event: any): void {
    this.apsstrDialogService.confirm().subscribe((result) => {
      if (result['text'] === 'No') {
        // console.log(event);
        // event.sender.data.data.push(event.dataItem);
        // event.sender.data.data = _.sortBy(event.sender.data.data, (item) => item.id);
      }
    });
  }

  private refineOfferToSave(): Offer {
    const copy: Offer = _.cloneDeep(this.offer);
    copy.startDate.setSeconds(0);
    copy.endDate.setSeconds(59);
    _.forEach(copy.offerReturns, (offerReturn) => {
      _.forEach(offerReturn.returnInfos, (returnInfo) => {
        delete returnInfo.payment.modes;
        delete returnInfo.payment.banks;
        delete returnInfo.payment.filteredCards;
      });
    });
    if (!this.isRechargeExtra) {
      copy.rechargeInfo = undefined;
    }
    if (!this.isFlight && !this.isBus) {
      copy.travelInfo = undefined;
    } else {
      if (!this.isFlight) {
        copy.travelInfo.flightInfo = undefined;
      }
      if (!this.isBus) {
        copy.travelInfo.busInfo = undefined;
      } else if (this.isBus) {
        if (copy.travelInfo && copy.travelInfo.busInfo) {
          const busInfo = copy.travelInfo.busInfo;
          if ((!busInfo.froms || busInfo.froms.length === 0) && (!busInfo.tos || busInfo.tos.length === 0)) {
            copy.travelInfo.busInfo = undefined;
            this.isBus = false;
          }
        }
      }
      if (!copy.travelInfo.busInfo && !copy.travelInfo.flightInfo) {
        copy.travelInfo = undefined;
        this.isBus = false;
        this.isFlight = false;
      }
    }
    // console.log(copy);
    return copy;
  }

  saveOffer(): void {
    this.isSaving = true;
    const copy = this.refineOfferToSave();
    if (this.offer.id !== undefined) {
      this.subscribeToSaveResponse(
        this.offerService.update(copy));
    } else {
      this.subscribeToSaveResponse(
        this.offerService.create(copy));
    }
  }

  selectAllCategories(): void {
    this.offerCategories = _.cloneDeep(this.categories);
    this.onCategoryChange(this.offerCategories);
  }

  unselectAllCategories(): void {
    this.offer.subCategories = [];
    this.onSubCategoryChange(this.offer.subCategories);
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
    this.offer.rechargeInfo.circles = _.cloneDeep(this.circles);
  }

  unselectAllCircles(): void {
    this.offer.rechargeInfo.circles = [];
  }

  selectAllRechargeTypes(): void {
    this.offer.rechargeInfo.rechargePlanTypes = _.cloneDeep(this.rechargePlanTypes);
  }

  unselectAllRechargeTypes(): void {
    this.offer.rechargeInfo.rechargePlanTypes = [];
  }

  selectAllTravelTypes(): void {
    this.offer.travelInfo.types = _.cloneDeep(this.travelTypes);
  }

  unselectAllTravelTypes(): void {
    this.offer.travelInfo.types = [];
  }

  selectAllFlightTypes(): void {
    this.offer.travelInfo.flightInfo.types = _.cloneDeep(this.regions);
  }

  unselectAllFlightTypes(): void {
    this.offer.travelInfo.flightInfo.types = [];
  }

  selectAllFlightOrigins(): void {
    this.offer.travelInfo.flightInfo.origins = _.cloneDeep(this.regions);
  }

  unselectAllFlightOrigins(): void {
    this.offer.travelInfo.flightInfo.origins = [];
  }

  selectAllFlightClasses(): void {
    this.offer.travelInfo.flightInfo.travelClasses = _.cloneDeep(this.flightClasses);
  }

  unselectAllFlightClasses(): void {
    this.offer.travelInfo.flightInfo.travelClasses = [];
  }

  selectAllBanks(dataItem): void {
    dataItem.payment.banks = _.cloneDeep(this.banks);
    this.onBankChange(dataItem.payment.banks, dataItem);
  }

  unselectAllBanks(dataItem): void {
    dataItem.payment.banks = [];
    this.onBankChange(dataItem.payment.banks, dataItem);
  }

  selectAllPaymentModes(dataItem): void {
    dataItem.payment.modes = _.cloneDeep(this.cardTypes);
    this.onPaymentModeChange(dataItem.payment.modes, dataItem);
  }

  unselectAllPaymentModes(dataItem): void {
    dataItem.payment.modes = [];
    this.onPaymentModeChange(dataItem.payment.modes, dataItem);
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

  private loadTabTwoEntities() {
    if (!this.affiliates) {
      this.loadAffiliates();
    }
    if (!this.merchants) {
      this.loadMerchants();
    }
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

  private loadTabThreeEntities() {
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
    if (!this.banks) {
      this.loadBanks();
    }
  }

  private loadTabFourEntities() {
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
    if (!this.offerPolicies) {
      this.loadOfferPolicies();
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

  private loadBusEntities(): void {
    if (!this.cities) {
      this.loadCities();
    }
  }

  private loadRechargeInfo(): void {
    this.offerService.findRechargeInfoById(this.offer.id).subscribe(
      (res: HttpResponse<Offer>) => {
        this.offer.rechargeInfo = res.body.rechargeInfo;
        this.isRechargeExtra = true;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadFlightInfo(): void {
    this.offerService.findFlightInfoById(this.offer.id).subscribe(
      (res: HttpResponse<Offer>) => {
        const travelInfo = res.body.travelInfo;
        if (!this.offer.travelInfo) {
          this.offer.travelInfo = travelInfo;
        } else {
          this.offer.travelInfo.flightInfo = travelInfo.flightInfo;
        }
        this.isFlight = true;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadBusInfo(): void {
    this.offerService.findBusInfoById(this.offer.id).subscribe(
      (res: HttpResponse<Offer>) => {
        const travelInfo = res.body.travelInfo;
        if (travelInfo) {
          if (!this.offer.travelInfo) {
            this.offer.travelInfo = travelInfo;
            if (this.offer.travelInfo.busInfo) {
              this.isBus = true;
            } else if (this.editMode) {
              this.offer.travelInfo.busInfo = new BusInfo();
              this.isBus = true;
            }
          } else if (travelInfo.busInfo) {
            this.offer.travelInfo.busInfo = travelInfo.busInfo;
            this.isBus = true;
          } else if (this.editMode) {
            this.offer.travelInfo.busInfo = new BusInfo();
            this.isBus = true;
          }
        } else if (this.editMode) {
          if (!this.offer.travelInfo) {
            this.offer.travelInfo = new TravelInfo();
            this.offer.travelInfo.busInfo = new BusInfo();
          } else if (!this.offer.travelInfo.busInfo) {
            this.offer.travelInfo.busInfo = new BusInfo();
          }
          this.isBus = true;
        }
        this.fetchedBusInfo = true;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadOfferTypes(): void {
    this.offerTypeService.findAll().subscribe(
      (res: HttpResponse<OfferType[]>) => {
        this.offerTypes = res.body;
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
        this.jhiEventManager.broadcast({
          name: 'tabTwoEntity',
          content: ''
        });
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadServiceProviders(): void {
    this.serviceProviderService.findWithSubCategories().subscribe(
      (res: HttpResponse<ServiceProvider[]>) => {
        this.serviceProviders = res.body;
        this.filteredServiceProviders = [];
        this.jhiEventManager.broadcast({
          name: 'tabTwoEntity',
          content: ''
        });
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

  private loadBanks(): void {
    this.bankService.findAll().subscribe(
      (res: HttpResponse<Bank[]>) => {
        this.banks = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadCards(): void {
    this.cardService.findWithTypeAndBanks().subscribe(
      (res: HttpResponse<Card[]>) => {
        this.cards = res.body;
        this.filteredCards = [];
        if (this.offer.id !== undefined) {
          this.extractBanksAndPaymentModesFromCards();
        }
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

  private loadOfferPolicies(): void {
    this.offerPolicyService.findAll().subscribe(
      (res: HttpResponse<OfferPolicy[]>) => {
        this.offerPolicies = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

}
