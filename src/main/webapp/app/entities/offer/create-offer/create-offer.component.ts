import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import { TabsetComponent } from 'ngx-bootstrap';

import { Offer, OfferService } from '..';
import { Categories, OfferTypes } from '../../../apsstr-core-ui-config';
import { Affiliate, AffiliateService } from '../../affiliate';
import { Category, CategoryService } from '../../category';
import { Circle, CircleService } from '../../circle';
import { City, CityService } from '../../city';
import { Country, CountryService } from '../../country';
import { Date, DateService } from '../../date';
import { Day, DayService } from '../../day';
import { Merchant, MerchantService } from '../../merchant';
import { OfferPolicy, OfferPolicyService } from '../../offer-policy';
import { OfferType, OfferTypeService } from '../../offer-type';
import { OperatingSystem, OperatingSystemService } from '../../operating-system';
import { ReechargeInfo } from '../../reecharge-info';
import { Region, RegionService } from '../../region';
import { ServiceProvider, ServiceProviderService } from '../../service-provider';
import { State, StateService } from '../../state';
import { SubCategory, SubCategoryService } from '../../sub-category';
import { TravelInfo } from '../../travel-info';
import { TravelType, TravelTypeService } from '../../travel-type';
import { ApsstrKendoDialogService } from '../../../apsstr-core-ui/apsstr-core/services';
import { OfferReturn } from '../../offer-return';
import { ReturnExtras } from '../../return-extras';
import { State as GridState } from '@progress/kendo-data-query';
import { GRID_STATE } from '../../../shared';
import { ReturnInfo } from '../../return-info';
import { MainReturn } from '../../main-return';
import { OfferPayment } from '../../offer-payment';
import { ReechargePlanTypeService, ReechargePlanType } from '../../reecharge-plan-type';
import { ReturnType, ReturnTypeService } from '../../return-type';
import { ReturnMode, ReturnModeService } from '../../return-mode';
import { Card, CardService } from '../../card';
import { CardType, CardTypeService } from '../../card-type';

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
  dates: Date[];
  days: Day[];
  countries: Country[];
  states: State[];
  filteredStates: State[];
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

  isCoupon: boolean;
  defaultOfferType;
  defaultOfferPolicy;
  defaultDate;
  defaultDay;
  defaultCountry;
  defaultState;
  defaultCity;
  defaultOperatingSystem;
  defaultAffiliate;
  defaultMerchant;
  defaultCategory;
  defaultSubCategory;
  defaultServiceProvider;
  defaultCircle;
  defaultReechargePlanType;
  defaultTravelType;
  defaultRegion;
  defaultOrigin;
  defaultReturnType;
  defaultReturnMode;
  defaultCard;
  defaultOffer;
  defaultPaymentMode;
  defaultCards;

  enabledTabs: Array<boolean>;
  offerCategories: Category[];
  categoryEnum;
  offerReturnFormGroup: FormGroup;
  gridState: GridState;
  returnInfoFormGroup: FormGroup;

  constructor(private offerService: OfferService, private offerTypeService: OfferTypeService, private offerPolicyService: OfferPolicyService, private dateService: DateService,
    private dayService: DayService, private countryService: CountryService, private stateService: StateService, private cityService: CityService,
    private operatingSystemService: OperatingSystemService, private affiliateService: AffiliateService, private merchantService: MerchantService,
    private categoryService: CategoryService, private subCategoryService: SubCategoryService, private serviceProviderService: ServiceProviderService,
    private circleService: CircleService, private travelTypeService: TravelTypeService, private regionService: RegionService, private formBuilder: FormBuilder,
    private apsstrKendoDialogService: ApsstrKendoDialogService, private reechargePlanTypeService: ReechargePlanTypeService, private returnTypeService: ReturnTypeService,
    private returnModeService: ReturnModeService, private cardService: CardService, private cardTypeService: CardTypeService) {
    this.createOfferReturnFormGroup = this.createOfferReturnFormGroup.bind(this);
    this.createReturnInfoFormGroup = this.createReturnInfoFormGroup.bind(this);
  }

  ngOnInit() {
    this.initialize();
    this.loadOfferTypes();
    this.loadOfferPolicies();
    this.loadDates();
    this.loadDays();
    this.loadCountries();
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
    this.offer = new Offer();
    this.offer.offerReturns = [];
  }

  initialize(): void {
    this.enabledTabs = _.times(5, _.stubFalse);
    this.enabledTabs[0] = true;
    this.isCoupon = false;
    this.categoryEnum = Categories;
    this.defaultOfferType = { id: null, name: 'Select Type' };
    this.defaultOfferPolicy = { id: null, name: 'Select Policy' };
    this.defaultDate = 'Select Dates';
    this.defaultDay = 'Select Days';
    this.defaultCountry = 'Select Countries';
    this.defaultState = 'Select States';
    this.defaultCity = 'Select Cities';
    this.defaultOperatingSystem = 'Select OS';
    this.defaultAffiliate = { id: null, name: 'Select Affiliate' };
    this.defaultMerchant = { id: null, name: 'Select Merchant' };
    this.defaultCategory = 'Select Categories';
    this.defaultSubCategory = 'Select Sub-Category';
    this.defaultServiceProvider = 'Select Service Provider';
    this.defaultCircle = 'Select Circles';
    this.defaultReechargePlanType = 'Select Reecharge Plan Type';
    this.defaultTravelType = 'Select Travel Types';
    this.defaultRegion = 'Select Regions';
    this.defaultOrigin = 'Select Origins';
    this.defaultReturnType = { id: null, name: 'Select Return Type' };
    this.defaultReturnMode = { id: null, name: 'Select Return Mode' };
    this.defaultCard = { id: null, name: 'Select Card' };
    this.defaultOffer = { id: null, name: 'Select Offer' };
    this.defaultReturnMode = { id: null, name: 'Select Return Mode' };
    this.defaultPaymentMode = 'Select Payment Modes';
    this.defaultCards = 'Select Cards';
    this.gridState = GRID_STATE;
  }

  loadOfferTypes(): void {
    this.offerTypeService.query().subscribe(
      (res: HttpResponse<OfferType[]>) => {
        this.offerTypes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadOfferPolicies(): void {
    this.offerPolicyService.query().subscribe(
      (res: HttpResponse<OfferPolicy[]>) => {
        this.offerPolicies = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadDates(): void {
    this.dateService.query().subscribe(
      (res: HttpResponse<Date[]>) => {
        this.dates = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadDays(): void {
    this.dayService.query().subscribe(
      (res: HttpResponse<Day[]>) => {
        this.days = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadCountries(): void {
    this.countryService.query().subscribe(
      (res: HttpResponse<Country[]>) => {
        this.countries = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadStates(): void {
    this.stateService.query().subscribe(
      (res: HttpResponse<State[]>) => {
        this.states = res.body;
        this.filteredStates = [];
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadCities(): void {
    this.cityService.query().subscribe(
      (res: HttpResponse<City[]>) => {
        this.cities = res.body;
        this.filteredCities = [];
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadOperatingSystems(): void {
    this.operatingSystemService.query().subscribe(
      (res: HttpResponse<OperatingSystem[]>) => {
        this.operatingSystems = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadAffiliates(): void {
    this.affiliateService.query().subscribe(
      (res: HttpResponse<Affiliate[]>) => {
        this.affiliates = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadMerchants(): void {
    this.merchantService.query().subscribe(
      (res: HttpResponse<Merchant[]>) => {
        this.merchants = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadCategories(): void {
    this.categoryService.query().subscribe(
      (res: HttpResponse<Category[]>) => {
        this.categories = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadSubCategories(): void {
    this.subCategoryService.query().subscribe(
      (res: HttpResponse<SubCategory[]>) => {
        this.subCategories = res.body;
        this.filteredSubCategories = [];
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadServiceProviders(): void {
    this.serviceProviderService.query().subscribe(
      (res: HttpResponse<ServiceProvider[]>) => {
        this.serviceProviders = res.body;
        this.filteredServiceProviders = [];
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadCircles(): void {
    this.circleService.query().subscribe(
      (res: HttpResponse<Circle[]>) => {
        this.circles = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadReechargePlanTypes(): void {
    this.reechargePlanTypeService.query().subscribe(
      (res: HttpResponse<ReechargePlanType[]>) => {
        this.reechargePlanTypes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadTravelTypes(): void {
    this.travelTypeService.query().subscribe(
      (res: HttpResponse<TravelType[]>) => {
        this.travelTypes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadRegions(): void {
    this.regionService.query().subscribe(
      (res: HttpResponse<Region[]>) => {
        this.regions = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadReturnTypes(): void {
    this.returnTypeService.query().subscribe(
      (res: HttpResponse<ReturnType[]>) => {
        this.returnTypes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadReturnModes(): void {
    this.returnModeService.query().subscribe(
      (res: HttpResponse<ReturnMode[]>) => {
        this.returnModes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadCards(): void {
    this.cardService.query().subscribe(
      (res: HttpResponse<Card[]>) => {
        this.cards = res.body;
        this.filteredCards = [];
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadOffersForReference(): void {
    this.offerService.query().subscribe(
      (res: HttpResponse<Offer[]>) => {
        this.offers = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadCardTypes(): void {
    this.cardTypeService.query().subscribe(
      (res: HttpResponse<CardType[]>) => {
        this.cardTypes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  goToNextTab(tabNumber: number): void {
    this.enabledTabs[tabNumber] = true;
    this.createOfferTabs.tabs[tabNumber].active = true;
  }

  onOfferTypeChange(offerType: OfferType): void {
    switch (offerType.name) {
      case OfferTypes.CPN:
      case OfferTypes.LDC:
        this.isCoupon = true;
        break;
      case OfferTypes.DEAL:
      case OfferTypes.LDD:
        this.isCoupon = false;
        break;
      default:
        this.isCoupon = false;
        break;
    }
  }

  onCountryChange(countries: Country[]): void {
    const selectedStates = this.offer.states;
    this.offer.states = [];
    this.filteredStates = [];
    let arr = null;
    _.forEach(countries, (country) => {
      arr = _.filter(this.states, (state) => state.country.id === country.id);
      this.filteredStates.push(...arr);
      arr = _.filter(selectedStates, (selectedState) => selectedState.country.id === country.id);
      this.offer.states.push(...arr);
    });
    this.onStateChange(this.offer.states);
  }

  onStateChange(states: State[]): void {
    this.filteredCities = [];
    let arr = null;
    const selectedCities = this.offer.cities;
    this.offer.cities = [];
    _.forEach(states, (state) => {
      arr = _.filter(this.cities, (city) => city.state.id === state.id);
      this.filteredCities.push(...arr);
      arr = _.filter(selectedCities, (selectedCity) => selectedCity.state.id === state.id);
      this.offer.cities.push(...arr);
    });
  }

  onCategoryChange(categories: Category[]): void {
    this.filteredSubCategories = [];
    let arr = null;
    const reechargeInfo = this.offer.reechargeInfo;
    const travelInfo = this.offer.travelInfo;
    this.offer.reechargeInfo = undefined;
    this.offer.travelInfo = undefined;
    const selectedSubCategories = this.offer.subCategories;
    this.offer.subCategories = [];
    _.forEach(categories, (category) => {
      arr = _.filter(this.subCategories, (subCategory) => subCategory.category.id === category.id);
      this.filteredSubCategories.push(...arr);
      switch (category.name) {
        case this.categoryEnum.RCHRG:
          this.offer.reechargeInfo = reechargeInfo ? reechargeInfo : new ReechargeInfo();
          break;
        case this.categoryEnum.TRVL:
          this.offer.travelInfo = travelInfo ? travelInfo : new TravelInfo();
          break;
      }
      arr = _.filter(selectedSubCategories, (selectedSubCategory) => selectedSubCategory.category.id === category.id);
      this.offer.subCategories.push(...arr);
    });
    this.onSubCategoryChange(this.offer.subCategories);
  }

  onSubCategoryChange(subCategories: SubCategory[]): void {
    this.filteredServiceProviders = [];
    let arr = null;
    let found = null;
    const selectedServiceProviders = this.offer.serviceProviders;
    this.offer.serviceProviders = [];
    _.forEach(subCategories, (subCategory) => {
      arr = _.filter(this.serviceProviders, (serviceProvider) => {
        found = _.find(serviceProvider.subCategories, (sCategory) => sCategory.id === subCategory.id);
        if (found) {
          return true;
        }
        return false;
      });
      this.filteredServiceProviders.push(...arr);
      arr = _.filter(selectedServiceProviders, (selectedServiceProvider) => {
        found = _.find(selectedServiceProvider.subCategories, (sCategory) => sCategory.id === subCategory.id);
        if (found) {
          return true;
        }
        return false;
      });
      this.offer.serviceProviders.push(...arr);
    });
  }

  onPaymentModeChange(modes: CardType[], dataItem): void {
    this.filteredCards = [];
    let arr = null;
    const selectedCards = dataItem.payment.cards;
    dataItem.payment.cards = [];
    _.forEach(modes, (mode) => {
      arr = _.filter(this.cards, (card) => card.type.id === mode.id);
      this.filteredCards.push(...arr);
      arr = _.filter(selectedCards, (selectedCard) => selectedCard.type.id === mode.id);
      dataItem.payment.cards.push(...arr);
    });
    console.log(dataItem.payment.cards);
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

  saveOffer(): void {
    console.log(this.offer);
  }

  private onError(error) {
    console.log('ERROR');
  }

}
