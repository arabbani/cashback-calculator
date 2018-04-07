import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { BlockUIService } from 'ng-block-ui';
import { JhiEventManager } from 'ng-jhipster';

import { BroadcastCashbackInfoService, CalculateCashbackService } from '../../../..';
import { CashbackInfo, MobileInput, StoredCashback, SubCategories } from '../../../../..';
import { ApsstrMetaService } from '../../../../../../apsstr-core-ui';
import {
  Circle,
  CircleService,
  RechargePlanType,
  RechargePlanTypeService,
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
  rechargePlanTypes: RechargePlanType[];
  calculating = false;
  subCategoryCode: string;
  previousSubCategoryCode: string;
  prepaidProviders: ServiceProvider[] = undefined;
  postpaidProviders: ServiceProvider[] = undefined;

  constructor(private blockUIService: BlockUIService, private jhiEventManager: JhiEventManager,
    private calculateCashbackService: CalculateCashbackService, private broadcastCashbackInfoService: BroadcastCashbackInfoService,
    private serviceProviderService: ServiceProviderService, private circleService: CircleService, private rechargePlanTypeService: RechargePlanTypeService,
    private route: ActivatedRoute, private apsstrMetaService: ApsstrMetaService) { }

  ngOnInit() {
    this.initializeSubCategory();
    this.getCircles();
    this.getRechargePlanTypes();
    this.setMeta();
  }

  private setMeta(): void {
    this.apsstrMetaService.setMeta(this.route.snapshot.data['title'], this.route.snapshot.data.meta['description']);
  }

  onSelectSubCategory(subCategoryCode: string): void {
    if (!this.previousSubCategoryCode || subCategoryCode !== this.previousSubCategoryCode) {
      this.previousSubCategoryCode = subCategoryCode;
      this.mobileInput.serviceProviderId = undefined;
      this.mobileInput.subCategoryId = undefined;
      this.getServiceProvidersBySubCategoryCode(subCategoryCode);
    }
  }

  calculate(): void {
    this.calculating = true;
    this.blockUIService.start('calculateCashback');
    this.calculateCashbackService.calculateCashbackForMobile(this.mobileInput).subscribe(
      (res: HttpResponse<CashbackInfo[]>) => {
        this.calculating = false;
        this.broadcastCashbackInfo(res.body);
      },
      (res: HttpErrorResponse) => this.onCashbackError(res.message)
    );
  }

  private broadcastCashbackInfo(cashbackInfos: CashbackInfo[]): void {
    this.broadcastCashbackInfoService.broadcastNewCashbackInfo(new StoredCashback(cashbackInfos, this.mobileInput, this.subCategoryCode));
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

  private getServiceProvidersBySubCategoryCode(subCategoryCode: string): void {
    this.serviceProviders = [];
    let providers: ServiceProvider[];
    let crawlFromServer = false;
    switch (subCategoryCode) {
      case SubCategories.PrepaidMobile:
        if (!this.prepaidProviders) {
          crawlFromServer = true;
        } else {
          crawlFromServer = false;
          providers = _.cloneDeep(this.prepaidProviders);
        }
        break;
      case SubCategories.PostpaidMobile:
        if (!this.postpaidProviders) {
          crawlFromServer = true;
        } else {
          crawlFromServer = false;
          providers = _.cloneDeep(this.postpaidProviders);
        }
        break;
    }
    if (crawlFromServer) {
      this.serviceProviderService.findBySubCategoryCode(subCategoryCode).subscribe(
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
          this.mobileInput.subCategoryId = this.getSubCategoryIdFromServiceProvider();
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    } else {
      this.serviceProviders = providers;
      this.mobileInput.subCategoryId = this.getSubCategoryIdFromServiceProvider();
    }
  }

  private initializeSubCategoryCode(): void {
    this.subCategoryCode = this.subCategories[0].value;
    this.onSelectSubCategory(this.subCategoryCode);
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

  private getCircles(): void {
    this.circleService.findAll().subscribe(
      (res: HttpResponse<Circle[]>) => {
        this.circles = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private getRechargePlanTypes(): void {
    this.rechargePlanTypeService.findAll().subscribe(
      (res: HttpResponse<RechargePlanType[]>) => {
        this.rechargePlanTypes = res.body;
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
