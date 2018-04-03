import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { BlockUIService } from 'ng-block-ui';
import { JhiEventManager } from 'ng-jhipster';

import { BroadcastCashbackInfoService, CalculateCashbackService } from '../../../..';
import { CashbackInfo, DatacardInput, StoredCashback, SubCategories } from '../../../../..';
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
  selector: 'apsstr-datacard',
  templateUrl: './datacard.component.html',
  styles: []
})
export class DatacardComponent implements OnInit {

  datacardInput = new DatacardInput();
  subCategories: any;
  circles: Circle[];
  serviceProviders: ServiceProvider[];
  rechargePlanTypes: RechargePlanType[];
  calculating = false;
  subCategoryCode: string;
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
    this.apsstrMetaService.setMeta(this.route.snapshot.data['title']);
  }

  onSelectSubCategory(subCategoryCode: string): void {
    this.datacardInput.serviceProviderId = undefined;
    this.getServiceProvidersBySubCategoryCode(subCategoryCode);
  }

  calculate(): void {
    this.calculating = true;
    this.blockUIService.start('calculateCashback');
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
          providers = _.cloneDeep(this.prepaidProviders);
        }
        break;
      case SubCategories.PostpaidDatacard:
        if (!this.postpaidProviders && this.postpaidProviders === undefined) {
          crawlFromServer = true;
        } else {
          crawlFromServer = false;
          providers = _.cloneDeep(this.postpaidProviders);
        }
        break;
      default:
        crawlFromServer = true;
    }
    if (crawlFromServer) {
      this.serviceProviderService.findBySubCategoryCode(subCategoryCode).subscribe(
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
          this.datacardInput.subCategoryId = this.getSubCategoryIdFromServiceProvider();
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    } else {
      this.serviceProviders = providers;
      this.datacardInput.subCategoryId = this.getSubCategoryIdFromServiceProvider();
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
    this.circleService.findAll().subscribe(
      (res: HttpResponse<Circle[]>) => {
        this.circles = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private getRechargePlanTypes(): void {
    this.rechargePlanTypeService.findAllDataPlans().subscribe(
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
