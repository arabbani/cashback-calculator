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

  isCoupon: boolean;
  defaultOfferType;
  defaultOfferPolicy;
  defaultDate;
  defaultDay;
  defaultCountry;
  defaultState;
  defaultCity;
  defaultOperatingSystem;

  enabledTabs: Array<boolean>;

  constructor(private offerService: OfferService, private offerTypeService: OfferTypeService, private offerPolicyService: OfferPolicyService, private dateService: DateService,
    private dayService: DayService, private countryService: CountryService, private stateService: StateService, private cityService: CityService,
    private operatingSystemService: OperatingSystemService) { }

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
    this.offer = new Offer();
  }

  initialize(): void {
    this.enabledTabs = _.times(2, _.stubFalse);
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
    this.filteredStates = _.filter(this.states, (state) => state.country.name === country.name);
    this.offer.states = undefined;
    this.offer.cities = undefined;
  }

  onStateChange(state: State): void {
    this.filteredCities = _.filter(this.cities, (city) => city.state.name === state.name);
    this.offer.cities = undefined;
  }

  private onError(error) {
    console.log('ERROR');
  }

}
