import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { TabsetComponent } from 'ngx-bootstrap';

import { Offer, OfferService } from '..';
import { OfferTypes, Categories } from '../../../apsstr-core-ui-config';
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
import { Circle, CircleService } from '../../circle';
import { ReechargeInfo } from '../../reecharge-info';
import { TravelInfo } from '../../travel-info';
import { TravelType, TravelTypeService } from '../../travel-type';
import { Region, RegionService } from '../../region';

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
  travelTypes: TravelType[];
  regions: Region[];

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
  defaultTravelType;
  defaultRegion;
  defaultOrigin;

  enabledTabs: Array<boolean>;
  offerCategories: Category[];
  categoryEnum;

  constructor(private offerService: OfferService, private offerTypeService: OfferTypeService, private offerPolicyService: OfferPolicyService, private dateService: DateService,
    private dayService: DayService, private countryService: CountryService, private stateService: StateService, private cityService: CityService,
    private operatingSystemService: OperatingSystemService, private affiliateService: AffiliateService, private merchantService: MerchantService,
    private categoryService: CategoryService, private subCategoryService: SubCategoryService, private serviceProviderService: ServiceProviderService,
    private circleService: CircleService, private travelTypeService: TravelTypeService, private regionService: RegionService) { }

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
    this.loadTravelTypes();
    this.loadRegions();
    this.offer = new Offer();
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
    this.defaultCountry = { id: null, name: 'Select Country' };
    this.defaultState = 'Select States';
    this.defaultCity = 'Select Cities';
    this.defaultOperatingSystem = 'Select OS';
    this.defaultAffiliate = { id: null, name: 'Select Affiliate' };
    this.defaultMerchant = { id: null, name: 'Select Merchant' };
    this.defaultCategory = 'Select Categories';
    this.defaultSubCategory = 'Select Sub-Category';
    this.defaultServiceProvider = 'Select Service Provider';
    this.defaultCircle = 'Select Circles';
    this.defaultTravelType = 'Select Travel Types';
    this.defaultRegion = 'Select Regions';
    this.defaultOrigin = 'Select Origins';
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

  onCountryChange(country: Country): void {
    this.filteredStates = _.filter(this.states, (state) => state.country.id === country.id);
    this.offer.states = undefined;
    this.offer.cities = undefined;
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

  private onError(error) {
    console.log('ERROR');
  }

}
