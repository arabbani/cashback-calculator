import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { BlockUIService } from 'ng-block-ui';
import { JhiEventManager } from 'ng-jhipster';

import { BroadcastCashbackInfoService, CalculateCashbackService } from '../../../..';
import { CashbackInfo, LandlineInput, StoredCashback, SubCategories } from '../../../../..';
import { ServiceProvider, ServiceProviderService } from '../../../../../../entities';

@Component({
  selector: 'apsstr-landline',
  templateUrl: './landline.component.html',
  styles: []
})
export class LandlineComponent implements OnInit {

  landlineInput = new LandlineInput();
  serviceProviders: ServiceProvider[];
  calculating = false;
  subCategoryCode: string;

  constructor(private blockUIService: BlockUIService, private jhiEventManager: JhiEventManager,
    private calculateCashbackService: CalculateCashbackService, private broadcastCashbackInfoService: BroadcastCashbackInfoService,
    private serviceProviderService: ServiceProviderService) { }

  ngOnInit() {
    this.initializeSubCategory();
    this.getServiceProvidersBySubCategoryCode(this.subCategoryCode);
    this.landlineInput.subCategoryId = this.getSubCategoryIdFromServiceProvider();
  }

  calculate(): void {
    this.calculating = true;
    this.blockUIService.start('calculateCashback');
    this.calculateCashbackService.calculateCashbackForLandline(this.landlineInput).subscribe(
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
    this.broadcastCashbackInfoService.broadcastNewCashbackInfo(new StoredCashback(cashbackInfos, this.landlineInput, this.subCategoryCode));
  }

  private getServiceProvidersBySubCategoryCode(subCategoryCode: string): void {
    this.serviceProviderService.bySubCategoryCode(subCategoryCode).subscribe(
      (res: HttpResponse<ServiceProvider[]>) => {
        this.serviceProviders = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private initializeSubCategory(): void {
    this.subCategoryCode = SubCategories.Landline;
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