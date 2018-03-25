import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { BlockUIService } from 'ng-block-ui';
import { JhiEventManager } from 'ng-jhipster';

import { BroadcastCashbackInfoService, CalculateCashbackService } from '../../../..';
import { CashbackInfo, MobileInput, StoredCashback, SubCategories } from '../../../../..';
import {
  Circle,
  CircleService,
  ReechargePlanType,
  ReechargePlanTypeService,
  ServiceProvider,
  ServiceProviderService,
} from '../../../../../../entities';

@Component({
  selector: 'apsstr-mobile',
  templateUrl: './mobile.component.html'
})
export class MobileComponent implements OnInit {

  mobileInput = new MobileInput();
  subCategories: any;
  circles: Circle[];
  serviceProviders: ServiceProvider[];
  reechargePlanTypes: ReechargePlanType[];
  calculating = false;
  subCategoryCode: string;
  prepaidProviders: ServiceProvider[] = undefined;
  postpaidProviders: ServiceProvider[] = undefined;

  constructor(private blockUIService: BlockUIService, private jhiEventManager: JhiEventManager,
    private calculateCashbackService: CalculateCashbackService, private broadcastCashbackInfoService: BroadcastCashbackInfoService,
    private serviceProviderService: ServiceProviderService, private circleService: CircleService, private reechargePlanTypeService: ReechargePlanTypeService) { }

  ngOnInit() {
    this.initializeSubCategory();
    this.getCircles();
    this.getReechargePlanTypes();
  }

  onSelectSubCategory(subCategoryCode: string): void {
    this.mobileInput.serviceProviderId = undefined;
    this.getServiceProvidersBySubCategoryCode(subCategoryCode);
  }

  calculate(): void {
    this.calculating = true;
    this.blockUIService.start('calculateCashback');
    this.mobileInput.subCategoryId = this.getSubCategoryIdFromServiceProvider();
    this.calculateCashbackService.calculateCashbackForMobile(this.mobileInput).subscribe(
      (res: HttpResponse<CashbackInfo[]>) => {
        this.calculating = false;
        this.broadcastCashbackInfo(res.body);
      },
      (res: HttpErrorResponse) => this.onCashbackError(res.message)
    );
  }

  private getSubCategoryIdFromServiceProvider(): number {
    let sId: number = undefined;
    let providers = undefined;
    switch (this.subCategoryCode) {
      case SubCategories.PrepaidMobile:
        providers = _.cloneDeep(this.prepaidProviders);
        break;
      case SubCategories.PostpaidMobile:
        providers = _.cloneDeep(this.postpaidProviders);
        break;
    }
    _.forEach(providers, (serviceProvider) => {
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
    this.broadcastCashbackInfoService.broadcastNewCashbackInfo(new StoredCashback(cashbackInfos, this.mobileInput, this.subCategoryCode));
  }

  private getServiceProvidersBySubCategoryCode(subCategoryCode: string): void {
    let providers: ServiceProvider[];
    let crawlFromServer = false;
    switch (subCategoryCode) {
      case SubCategories.PrepaidMobile:
        if (!this.prepaidProviders && this.prepaidProviders === undefined) {
          crawlFromServer = true;
        } else {
          crawlFromServer = false;
          providers = this.prepaidProviders;
        }
        break;
      case SubCategories.PostpaidMobile:
        if (!this.postpaidProviders && this.postpaidProviders === undefined) {
          crawlFromServer = true;
        } else {
          crawlFromServer = false;
          providers = this.postpaidProviders;
        }
        break;
      default:
        crawlFromServer = true;
    }
    if (crawlFromServer) {
      this.serviceProviderService.bySubCategoryCode(subCategoryCode).subscribe(
        (res: HttpResponse<ServiceProvider[]>) => {
          providers = res.body;
          switch (subCategoryCode) {
            case SubCategories.PrepaidMobile:
              this.prepaidProviders = providers;
              break;
            case SubCategories.PostpaidMobile:
              this.postpaidProviders = providers;
              break;
          }
          this.serviceProviders = providers;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    } else {
      this.serviceProviders = providers;
    }
  }

  private initializeSubCategory(): void {
    this.subCategories = [{
      'name': 'Prepaid',
      'value': SubCategories.PrepaidMobile
    },
    {
      'name': 'Postpaid',
      'value': SubCategories.PostpaidMobile
    }
    ];
    this.initializeSubCategoryCode();
  }

  private initializeSubCategoryCode(): void {
    this.subCategoryCode = this.subCategories[0].value;
    this.onSelectSubCategory(this.subCategoryCode);
  }

  private getCircles(): void {
    this.circleService.query().subscribe(
      (res: HttpResponse<Circle[]>) => {
        this.circles = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private getReechargePlanTypes(): void {
    this.reechargePlanTypeService.query().subscribe(
      (res: HttpResponse<ReechargePlanType[]>) => {
        this.reechargePlanTypes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
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
