import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { TabsetComponent } from 'ngx-bootstrap';

import { Offer, OfferService } from '..';
import { OfferTypes } from '../../../apsstr-core-ui-config';
import { City, CityService } from '../../city';
import { Country, CountryService } from '../../country';
import { Date, DateService } from '../../date';
import { Day, DayService } from '../../day';
import { OfferPolicy, OfferPolicyService } from '../../offer-policy';
import { OfferType, OfferTypeService } from '../../offer-type';
import { State, StateService } from '../../state';
import { OperatingSystem, OperatingSystemService } from '../../operating-system';
import { Affiliate, AffiliateService } from '../../affiliate';
import { Merchant, MerchantService } from '../../merchant';
import { Category, CategoryService } from '../../category';
import { SubCategory, SubCategoryService } from '../../sub-category';
import { ServiceProvider, ServiceProviderService } from '../../service-provider';

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

  enabledTabs: Array<boolean>;
  offerCategory: Category;

  constructor(private offerService: OfferService, private offerTypeService: OfferTypeService, private offerPolicyService: OfferPolicyService, private dateService: DateService,
    private dayService: DayService, private countryService: CountryService, private stateService: StateService, private cityService: CityService,
    private operatingSystemService: OperatingSystemService, private affiliateService: AffiliateService, private merchantService: MerchantService,
    private categoryService: CategoryService, private subCategoryService: SubCategoryService, private serviceProviderService: ServiceProviderService) { }

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
    this.offer = new Offer();
  }

  initialize(): void {
    this.enabledTabs = _.times(5, _.stubFalse);
    this.enabledTabs[0] = true;
    this.isCoupon = false;
    this.defaultOfferType = { id: null, name: 'Select Type' };
    this.defaultOfferPolicy = { id: null, name: 'Select Policy' };
    this.defaultDate = { id: null, name: 'Select Date' };
    this.defaultDay = { id: null, name: 'Select Day' };
    this.defaultCountry = { id: null, name: 'Select Country' };
    this.defaultState = { id: null, name: 'Select State' };
    this.defaultCity = { id: null, name: 'Select City' };
    this.defaultOperatingSystem = { id: null, name: 'Select OS' };
    this.defaultAffiliate = { id: null, name: 'Select Affiliate' };
    this.defaultMerchant = { id: null, name: 'Select Merchant' };
    this.defaultCategory = { id: null, name: 'Select Category' };
    this.defaultSubCategory = { id: null, name: 'Select Sub-Category' };
    this.defaultServiceProvider = { id: null, name: 'Select Service Provider' };
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
        this.filteredStates = this.states;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadCities(): void {
    this.cityService.query().subscribe(
      (res: HttpResponse<City[]>) => {
        this.cities = res.body;
        this.filteredCities = this.cities;
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
        this.filteredSubCategories = this.subCategories;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadServiceProviders(): void {
    this.serviceProviderService.query().subscribe(
      (res: HttpResponse<ServiceProvider[]>) => {
        this.serviceProviders = res.body;
        this.filteredServiceProviders = this.serviceProviders;
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
      case OfferTypes.coupon:
      case OfferTypes.luckyDrawCoupon:
        this.isCoupon = true;
        break;
      case OfferTypes.deal:
      case OfferTypes.luckyDrawDeal:
        this.isCoupon = false;
        break;
      default:
        this.isCoupon = false;
        break;
    }
  }

  onCountryChange(country: Country): void {
    this.filteredStates = _.filter(this.states, (state) => state.country.id === country.id);
    this.offer.states = undefined;
    this.offer.cities = undefined;
  }

  onStateChange(state: State): void {
    this.filteredCities = _.filter(this.cities, (city) => city.state.id === state.id);
    this.offer.cities = undefined;
  }

  onCategoryChange(category: Category): void {
    this.offerCategory = category;
    this.filteredSubCategories = _.filter(this.subCategories, (subCategory) => subCategory.category.id === this.offerCategory.id);
  }

  onSubCategoryChange(subCategory: SubCategory): void {
    let found;
    this.filteredServiceProviders = _.filter(this.serviceProviders, (serviceProvider) => {
      found = _.find(serviceProvider.subCategories, (sCategory) => subCategory.id === sCategory.id);
      if (found) {
        return true;
      } else {
        return false;
      }
    });
  }

  private onError(error) {
    console.log('ERROR');
  }

}
