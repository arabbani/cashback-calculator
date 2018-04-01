import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { BlockUIService } from 'ng-block-ui';
import { JhiEventManager } from 'ng-jhipster';

import { BroadcastCashbackInfoService, CalculateCashbackService } from '../../../..';
import { CabInput, CashbackInfo, StoredCashback, SubCategories } from '../../../../..';
import { City, CityService, ServiceProvider, ServiceProviderService } from '../../../../../../entities';

@Component({
  selector: 'apsstr-cab',
  templateUrl: './cab.component.html',
  styles: []
})
export class CabComponent implements OnInit {

  cabInput = new CabInput();
  serviceProviders: ServiceProvider[];
  cities: City[];
  calculating = false;
  subCategoryCode: string;

  constructor(private blockUIService: BlockUIService, private jhiEventManager: JhiEventManager,
    private calculateCashbackService: CalculateCashbackService, private broadcastCashbackInfoService: BroadcastCashbackInfoService,
    private serviceProviderService: ServiceProviderService, private cityService: CityService) { }

  ngOnInit() {
    this.initializeSubCategory();
    this.getServiceProvidersBySubCategoryCode(this.subCategoryCode);
    this.getCities();
  }

  calculate(): void {
    this.calculating = true;
    this.blockUIService.start('calculateCashback');
    this.calculateCashbackService.calculateCashbackForCab(this.cabInput).subscribe(
      (res: HttpResponse<CashbackInfo[]>) => {
        this.calculating = false;
        this.broadcastCashbackInfo(res.body);
      },
      (res: HttpErrorResponse) => this.onCashbackError(res.message)
    );
  }

  private getSubCategoryIdFromServiceProvider(): number {
    let sId: number = undefined;
    _.forEach(this.serviceProviders, (serviceProvider) => {
      let cc = undefined;
      cc = _.forEach(serviceProvider.subCategories, (subCategory) => {
        if (subCategory.code === this.subCategoryCode) {
          sId = subCategory.id;
          return true;
        }
      });
      if (cc) {
        return;
      }
    });
    return sId;
  }

  private broadcastCashbackInfo(cashbackInfos: CashbackInfo[]): void {
    this.broadcastCashbackInfoService.broadcastNewCashbackInfo(new StoredCashback(cashbackInfos, this.cabInput, this.subCategoryCode));
  }

  private getServiceProvidersBySubCategoryCode(subCategoryCode: string): void {
    this.serviceProviderService.bySubCategoryCode(subCategoryCode).subscribe(
      (res: HttpResponse<ServiceProvider[]>) => {
        this.serviceProviders = res.body;
        this.cabInput.subCategoryId = this.getSubCategoryIdFromServiceProvider();
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  getCities(): void {
    this.cityService.findAll().subscribe(
      (res: HttpResponse<City[]>) => {
        this.cities = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private initializeSubCategory(): void {
    this.subCategoryCode = SubCategories.Cab;
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
