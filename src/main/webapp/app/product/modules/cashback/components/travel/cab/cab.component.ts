import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockUIService } from 'ng-block-ui';
import { JhiEventManager } from 'ng-jhipster';

import { BroadcastCashbackInfoService, CashbackService } from '../../../..';
import { CabInput, CashbackInfo, StoredCashback, SubCategories } from '../../../../..';
import { ApsstrMetaService } from '../../../../../../apsstr-core-ui';
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
    private cashbackService: CashbackService, private broadcastCashbackInfoService: BroadcastCashbackInfoService,
    private serviceProviderService: ServiceProviderService, private cityService: CityService, private route: ActivatedRoute, private apsstrMetaService: ApsstrMetaService) { }

  ngOnInit() {
    this.initializeSubCategory();
    this.getServiceProvidersBySubCategoryCode(this.subCategoryCode);
    this.getCities();
    this.setMeta();
  }

  private setMeta(): void {
    this.apsstrMetaService.setMeta(this.route.snapshot.data['title'], this.route.snapshot.data.meta['description']);
  }

  calculate(): void {
    this.calculating = true;
    this.blockUIService.start('calculateCashback');
    this.cashbackService.cab(this.cabInput).subscribe(
      (res: HttpResponse<CashbackInfo[]>) => {
        this.calculating = false;
        this.broadcastCashbackInfo(res.body);
      },
      (res: HttpErrorResponse) => this.onCashbackError(res.message)
    );
  }

  private broadcastCashbackInfo(cashbackInfos: CashbackInfo[]): void {
    this.broadcastCashbackInfoService.broadcastNewCashbackInfo(new StoredCashback(cashbackInfos, this.cabInput, this.subCategoryCode));
  }

  private getSubCategoryIdFromServiceProvider(): number {
    return this.serviceProviders[0]['subCategories'][0].id;
  }

  private getServiceProvidersBySubCategoryCode(subCategoryCode: string): void {
    this.serviceProviderService.findBySubCategoryCode(subCategoryCode).subscribe(
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
