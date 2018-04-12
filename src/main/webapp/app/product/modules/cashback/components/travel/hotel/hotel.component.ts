import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockUIService } from 'ng-block-ui';
import { JhiEventManager } from 'ng-jhipster';

import { BroadcastCashbackInfoService, CashbackService } from '../../../..';
import { CashbackInfo, HotelInput, Regions, StoredCashback, SubCategories } from '../../../../..';
import { ApsstrMetaService } from '../../../../../../apsstr-core-ui';
import {
  Merchant,
  MerchantService,
  Region,
  RegionService,
  SubCategory,
  SubCategoryService,
} from '../../../../../../entities';

@Component({
  selector: 'apsstr-hotel',
  templateUrl: './hotel.component.html',
  styles: []
})
export class HotelComponent implements OnInit {

  hotelInput = new HotelInput();
  regions: Region[];
  merchants: Merchant[];
  calculating = false;
  subCategoryCode: string;
  regionsEnum;

  constructor(private blockUIService: BlockUIService, private jhiEventManager: JhiEventManager,
    private cashbackService: CashbackService, private broadcastCashbackInfoService: BroadcastCashbackInfoService,
    private regionService: RegionService, private route: ActivatedRoute, private apsstrMetaService: ApsstrMetaService, private subCategoryService: SubCategoryService,
    private merchantService: MerchantService) { }

  ngOnInit() {
    this.getRegions();
    this.initializeSubCategory();
    this.getSubCategoryByCode(this.subCategoryCode);
    this.regionsEnum = Regions;
    this.setMeta();
  }

  private setMeta(): void {
    this.apsstrMetaService.setMeta(this.route.snapshot.data['title'], this.route.snapshot.data.meta['description']);
  }

  calculate(): void {
    this.calculating = true;
    this.blockUIService.start('calculateCashback');
    this.cashbackService.hotel(this.hotelInput).subscribe(
      (res: HttpResponse<CashbackInfo[]>) => {
        this.calculating = false;
        this.broadcastCashbackInfo(res.body);
      },
      (res: HttpErrorResponse) => this.onCashbackError(res.message)
    );
  }

  private broadcastCashbackInfo(cashbackInfos: CashbackInfo[]): void {
    this.broadcastCashbackInfoService.broadcastNewCashbackInfo(new StoredCashback(cashbackInfos, this.hotelInput, this.subCategoryCode));
  }

  private getSubCategoryByCode(subCategoryCode: string): void {
    this.subCategoryService.findByCode(subCategoryCode).subscribe(
      (res: HttpResponse<SubCategory>) => {
        const subCategory = res.body;
        this.hotelInput.subCategoryId = subCategory.id;
        this.getMerchants(subCategory.id);
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

  private getMerchants(id: number): void {
    this.merchantService.finBySubCategoryId(id).subscribe(
      (res: HttpResponse<Merchant[]>) => {
        this.merchants = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private initializeSubCategory(): void {
    this.subCategoryCode = SubCategories.Hotel;
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
