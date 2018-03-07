import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { State as GridState } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { TabsetComponent } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';

import { Offer, OfferService } from '..';
import { Categories, OfferTypes } from '../../../apsstr-core-ui-config';
import { ApsstrKendoDialogService } from '../../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../../shared';
import { Affiliate, AffiliateService } from '../../affiliate';
import { Card, CardService } from '../../card';
import { CardType, CardTypeService } from '../../card-type';
import { Category, CategoryService } from '../../category';
import { Circle, CircleService } from '../../circle';
import { City, CityService } from '../../city';
import { Country, CountryService } from '../../country';
import { Date, DateService } from '../../date';
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

  offerCategories: Category[];
  categoryEnum;
  offerReturnFormGroup: FormGroup;
  gridState: GridState;
  returnInfoFormGroup: FormGroup;
  isSaving: boolean;

  constructor(private offerService: OfferService, private offerTypeService: OfferTypeService, private offerPolicyService: OfferPolicyService, private dateService: DateService,
    private dayService: DayService, private countryService: CountryService, private stateService: StateService, private cityService: CityService,
    private operatingSystemService: OperatingSystemService, private affiliateService: AffiliateService, private merchantService: MerchantService,
    private categoryService: CategoryService, private subCategoryService: SubCategoryService, private serviceProviderService: ServiceProviderService,
    private circleService: CircleService, private travelTypeService: TravelTypeService, private regionService: RegionService, private formBuilder: FormBuilder,
    private apsstrKendoDialogService: ApsstrKendoDialogService, private reechargePlanTypeService: ReechargePlanTypeService, private returnTypeService: ReturnTypeService,
    private returnModeService: ReturnModeService, private cardService: CardService, private cardTypeService: CardTypeService, private router: Router) {
    this.createOfferReturnFormGroup = this.createOfferReturnFormGroup.bind(this);
    this.createReturnInfoFormGroup = this.createReturnInfoFormGroup.bind(this);
  }

  ngOnInit() {
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
    this.initialize();
    this.createOffer();
  }

  initialize(): void {
    this.categoryEnum = Categories;
    this.gridState = GRID_STATE;
    this.isSaving = false;
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
  }

  private enableTab(tabNumber: number): void {
    this.createOfferTabs.tabs[tabNumber].disabled = false;
  }

  private createOffer(): void {
    _.forEach(this.createOfferTabs.tabs, (tab, index) => {
      if (index !== 0) {
        tab.disabled = true;
      }
    });
    this.enableTab(0);
    this.offer = new Offer();
    this.offer.offerReturns = [];
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
      (res: HttpResponse<Date[]>) => {
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

  private loadCountries(): void {
    this.countryService.query().subscribe(
      (res: HttpResponse<Country[]>) => {
        this.countries = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadStates(): void {
    this.stateService.query().subscribe(
      (res: HttpResponse<State[]>) => {
        this.states = res.body;
        this.filteredStates = [];
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
      case OfferTypes.CPN:
      case OfferTypes.LDC:
        return true;
      case OfferTypes.DEAL:
      case OfferTypes.LDD:
        return false;
      default:
        return false;
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
      this.filteredServiceProviders = _.union(this.filteredServiceProviders, arr);
      // this.filteredServiceProviders.push(...arr);
      arr = _.filter(selectedServiceProviders, (selectedServiceProvider) => {
        found = _.find(selectedServiceProvider.subCategories, (sCategory) => sCategory.id === subCategory.id);
        if (found) {
          return true;
        }
        return false;
      });
      this.offer.serviceProviders = _.union(this.offer.serviceProviders, arr);
      // this.offer.serviceProviders.push(...arr);
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

  goToNextTab(tabNumber: number): void {
    this.enableTab(tabNumber);
    this.createOfferTabs.tabs[tabNumber].active = true;
  }

  goToPreviousTab(tabNumber: number): void {
    this.createOfferTabs.tabs[tabNumber].active = true;
  }

  saveOffer(): void {
    console.log(this.offer);
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
    this.isSaving = false;
    this.router.navigate(['/offer']);
  }

  private onSaveError() {
    this.isSaving = false;
    this.apsstrKendoDialogService.error();
  }

  private onError(error) {
    console.log('ERROR');
  }

}
