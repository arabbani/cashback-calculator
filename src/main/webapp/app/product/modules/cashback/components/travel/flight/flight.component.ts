import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { BlockUIService } from 'ng-block-ui';
import { JhiEventManager } from 'ng-jhipster';

import { BroadcastCashbackInfoService, CashbackService } from '../../../..';
import { CashbackInfo, FlightInput, Regions, StoredCashback, SubCategories } from '../../../../..';
import { ApsstrMetaService } from '../../../../../../apsstr-core-ui';
import {
  Region,
  RegionService,
  ServiceProvider,
  ServiceProviderService,
  TravelType,
  TravelTypeService,
} from '../../../../../../entities';
import { FlightClass, FlightClassService } from '../../../../../../entities/flight-class';

@Component({
  selector: 'apsstr-flight',
  templateUrl: './flight.component.html',
  styles: []
})
export class FlightComponent implements OnInit {

  flightInput = new FlightInput();
  serviceProviders: ServiceProvider[];
  travelTypes: TravelType[];
  flightClasses: FlightClass[];
  regions: Region[];
  calculating = false;
  subCategoryCode: string;
  regionsEnum;
  flightDestination: number;

  constructor(private blockUIService: BlockUIService, private jhiEventManager: JhiEventManager,
    private cashbackService: CashbackService, private broadcastCashbackInfoService: BroadcastCashbackInfoService,
    private serviceProviderService: ServiceProviderService, private travelTypeService: TravelTypeService, private flightClassService: FlightClassService,
    private regionService: RegionService, private route: ActivatedRoute, private apsstrMetaService: ApsstrMetaService) { }

  ngOnInit() {
    this.initializeSubCategory();
    this.getServiceProvidersBySubCategoryCode(this.subCategoryCode);
    this.getTravelTypes();
    this.getFlightClasses();
    this.getRegions();
    this.regionsEnum = Regions;
    this.setMeta();
  }

  private setMeta(): void {
    this.apsstrMetaService.setMeta(this.route.snapshot.data['title'], this.route.snapshot.data.meta['description']);
  }

  calculate(): void {
    this.calculating = true;
    this.blockUIService.start('calculateCashback');
    this.flightInput.flightTypeId = this.getFlightType();
    this.cashbackService.flight(this.flightInput).subscribe(
      (res: HttpResponse<CashbackInfo[]>) => {
        this.calculating = false;
        this.broadcastCashbackInfo(res.body);
      },
      (res: HttpErrorResponse) => this.onCashbackError(res.message)
    );
  }

  private broadcastCashbackInfo(cashbackInfos: CashbackInfo[]): void {
    this.broadcastCashbackInfoService.broadcastNewCashbackInfo(new StoredCashback(cashbackInfos, this.flightInput, this.subCategoryCode));
  }

  getFlightType(): number {
    let destination = undefined;
    if (this.flightInput.flightOriginId === this.flightDestination) {
      destination = this.regionsEnum.Domestic;
    } else {
      destination = this.regionsEnum.International;
    }
    const flightType = _.find(this.regions, (region) => region.name === destination);
    return flightType.id;
  }

  private getSubCategoryIdFromServiceProvider(): number {
    return this.serviceProviders[0]['subCategories'][0].id;
  }

  private getServiceProvidersBySubCategoryCode(subCategoryCode: string): void {
    this.serviceProviderService.findBySubCategoryCode(subCategoryCode).subscribe(
      (res: HttpResponse<ServiceProvider[]>) => {
        this.serviceProviders = res.body;
        this.flightInput.subCategoryId = this.getSubCategoryIdFromServiceProvider();
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private getTravelTypes(): void {
    this.travelTypeService.findAll().subscribe(
      (res: HttpResponse<TravelType[]>) => {
        this.travelTypes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private getFlightClasses(): void {
    this.flightClassService.findAll().subscribe(
      (res: HttpResponse<FlightClass[]>) => {
        this.flightClasses = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private getRegions(): void {
    this.regionService.findAll().subscribe(
      (res: HttpResponse<Region[]>) => {
        this.regions = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private initializeSubCategory(): void {
    this.subCategoryCode = SubCategories.Flight;
  }

  private onError(error): void {
    console.log('Error ', error);
  }

  private onCashbackError(error): void {
    this.calculating = false;
    this.blockUIService.stop('calculateCashback');
    this.jhiEventManager.broadcast({
      name: 'calculateCashbackError',
      content: error
    });
    this.onError(error);
  }

}
