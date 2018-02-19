import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from '@progress/kendo-angular-dialog';

import { ApsstrKendoDialogService, AssetPathService } from './services';

@NgModule({
  imports: [
    CommonModule,
    DialogModule
  ],
  providers: [
    AssetPathService,
    ApsstrKendoDialogService
  ]
})
export class ApsstrCoreModule { }
