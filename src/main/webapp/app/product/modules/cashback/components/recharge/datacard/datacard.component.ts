import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { BlockUIService } from 'ng-block-ui';
import { JhiEventManager } from 'ng-jhipster';

import { BroadcastCashbackInfoService, CashbackService } from '../../../..';
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
  previousSubCategoryCode: string;
  prepaidProviders: ServiceProvider[] = undefined;
  postpaidProviders: ServiceProvider[] = undefined;

  constructor(private blockUIService: BlockUIService, private jhiEventManager: JhiEventManager,
    private cashbackService: CashbackService, private broadcastCashbackInfoService: BroadcastCashbackInfoService,
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
      this.datacardInput.serviceProviderId = undefined;
      this.datacardInput.subCategoryId = undefined;
      this.getServiceProvidersBySubCategoryCode(subCategoryCode);
    }
  }

  calculate(): void {
    this.calculating = true;
    this.blockUIService.start('calculateCashback');
    this.cashbackService.datacard(this.datacardInput).subscribe(
      (res: HttpResponse<CashbackInfo[]>) => {
        this.calculating = false;
        this.broadcastCashbackInfo(res.body);
      },
      (res: HttpErrorResponse) => this.onCashbackError(res.message)
    );
  }

  private broadcastCashbackInfo(cashbackInfos: CashbackInfo[]): void {
    this.broadcastCashbackInfoService.broadcastNewCashbackInfo(new StoredCashback(cashbackInfos, this.datacardInput, this.subCategoryCode));
  }

  private getSubCategoryIdFromServiceProvider(): number {
    return this.serviceProviders[0]['subCategories'][0].id;
  }

  private getServiceProvidersBySubCategoryCode(subCategoryCode: string): void {
    this.serviceProviders = [];
    let providers: ServiceProvider[];
    let crawlFromServer = false;
    switch (subCategoryCode) {
      case SubCategories.PrepaidDatacard:
        if (!this.prepaidProviders) {
          crawlFromServer = true;
        } else {
          crawlFromServer = false;
          providers = _.cloneDeep(this.prepaidProviders);
        }
        break;
      case SubCategories.PostpaidDatacard:
        if (!this.postpaidProviders) {
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
