import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockUIService } from 'ng-block-ui';
import { JhiEventManager } from 'ng-jhipster';

import { BroadcastCashbackInfoService, CashbackService } from '../../../..';
import { CashbackInfo, ElectricityInput, StoredCashback, SubCategories } from '../../../../..';
import { ApsstrMetaService } from '../../../../../../apsstr-core-ui';
import { ServiceProvider, ServiceProviderService } from '../../../../../../entities';

@Component({
  selector: 'apsstr-electricity',
  templateUrl: './electricity.component.html',
  styles: []
})
export class ElectricityComponent implements OnInit {

  electricityInput = new ElectricityInput();
  serviceProviders: ServiceProvider[];
  calculating = false;
  subCategoryCode: string;

  constructor(private blockUIService: BlockUIService, private jhiEventManager: JhiEventManager,
    private cashbackService: CashbackService, private broadcastCashbackInfoService: BroadcastCashbackInfoService,
    private serviceProviderService: ServiceProviderService, private route: ActivatedRoute, private apsstrMetaService: ApsstrMetaService) { }

  ngOnInit() {
    this.initializeSubCategory();
    this.getServiceProvidersBySubCategoryCode(this.subCategoryCode);
    this.setMeta();
  }

  private setMeta(): void {
    this.apsstrMetaService.setMeta(this.route.snapshot.data['title'], this.route.snapshot.data.meta['description']);
  }

  calculate(): void {
    this.calculating = true;
    this.blockUIService.start('calculateCashback');
    this.cashbackService.electricity(this.electricityInput).subscribe(
      (res: HttpResponse<CashbackInfo[]>) => {
        this.calculating = false;
        this.broadcastCashbackInfo(res.body);
      },
      (res: HttpErrorResponse) => this.onCashbackError(res.message)
    );
  }

  private broadcastCashbackInfo(cashbackInfos: CashbackInfo[]): void {
    this.broadcastCashbackInfoService.broadcastNewCashbackInfo(new StoredCashback(cashbackInfos, this.electricityInput, this.subCategoryCode));
  }

  private getSubCategoryIdFromServiceProvider(): number {
    return this.serviceProviders[0]['subCategories'][0].id;
  }

  private getServiceProvidersBySubCategoryCode(subCategoryCode: string): void {
    this.serviceProviderService.findBySubCategoryCode(subCategoryCode).subscribe(
      (res: HttpResponse<ServiceProvider[]>) => {
        this.serviceProviders = res.body;
        this.electricityInput.subCategoryId = this.getSubCategoryIdFromServiceProvider();
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private initializeSubCategory(): void {
    this.subCategoryCode = SubCategories.Electricity;
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
