import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import {
  AppStorageService,
  BroadcastCashbackInfoService,
  BroadcastSubCategoryCodeService,
  CalculateCashbackService,
  StoredCashbackService,
} from './services';
import { AppStorageComponent } from './app-storage/app-storage.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AppStorageComponent],
  exports: [AppStorageComponent],
  providers: [
    BroadcastCashbackInfoService, BroadcastSubCategoryCodeService, CalculateCashbackService, StoredCashbackService,
    AppStorageService
  ]
})
export class ProductCoreModule {

  constructor(@Optional() @SkipSelf() parentModule: ProductCoreModule) {
    if (parentModule) {
      throw new Error('ProductCoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
