import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { BlockUIService } from 'ng-block-ui';
import { JhiEventManager } from 'ng-jhipster';

import { BroadcastCashbackInfoService, CalculateCashbackService } from '../../../..';
import { CashbackInfo, DatacardInput, StoredCashback, SubCategories } from '../../../../..';
import {
  Circle,
  CircleService,
  ReechargePlanType,
  ReechargePlanTypeService,
  ServiceProvider,
  ServiceProviderService,
} from '../../../../../../entities';

@Component({
  selector: 'apsstr-datacard',
  templateUrl: './datacard.component.html',
  styles: []
})
export class DatacardComponent implements OnInit {

  datacardInput = new DatacardInput();
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
    this.datacardInput.serviceProviderId = undefined;
    this.getServiceProvidersBySubCategoryCode(subCategoryCode);
  }

  calculate(): void {
    this.calculating = true;
    this.blockUIService.start('calculateCashback');
    this.datacardInput.subCategoryId = this.getSubCategoryIdFromServiceProvider();
    this.calculateCashbackService.calculateCashbackForDatacard(this.datacardInput).subscribe(
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
      case SubCategories.PrepaidDatacard:
        providers = _.cloneDeep(this.prepaidProviders);
        break;
      case SubCategories.PostpaidDatacard:
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
    this.broadcastCashbackInfoService.broadcastNewCashbackInfo(new StoredCashback(cashbackInfos, this.datacardInput, this.subCategoryCode));
  }

  private getServiceProvidersBySubCategoryCode(subCategoryCode: string): void {
    let providers: ServiceProvider[];
    let crawlFromServer = false;
    switch (subCategoryCode) {
      case SubCategories.PrepaidDatacard:
        if (!this.prepaidProviders && this.prepaidProviders === undefined) {
          crawlFromServer = true;
        } else {
          crawlFromServer = false;
          providers = this.prepaidProviders;
        }
        break;
      case SubCategories.PostpaidDatacard:
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
            case SubCategories.PrepaidDatacard:
              this.prepaidProviders = providers;
              break;
            case SubCategories.PostpaidDatacard:
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
      'value': SubCategories.PrepaidDatacard
    },
    {
      'name': 'Postpaid',
      'value': SubCategories.PostpaidDatacard
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
