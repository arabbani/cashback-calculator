import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import {
  BroadcastCashbackInfoService,
  BroadcastSubCategoryCodeService,
  CalculateCashbackService,
  StoredCashbackService,
} from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    BroadcastCashbackInfoService, BroadcastSubCategoryCodeService, CalculateCashbackService, StoredCashbackService
  ]
})
export class ProductCoreModule {

  constructor(@Optional() @SkipSelf() parentModule: ProductCoreModule) {
    if (parentModule) {
      throw new Error('ProductCoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
