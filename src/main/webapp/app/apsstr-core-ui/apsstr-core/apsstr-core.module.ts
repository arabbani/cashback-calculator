import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from '@progress/kendo-angular-dialog';

import { ApsstrKendoDialogService, AssetPathService, FilterEntitiesService } from './services';

@NgModule({
  imports: [
    CommonModule,
    DialogModule
  ],
  providers: [
    AssetPathService,
    ApsstrKendoDialogService,
    FilterEntitiesService
  ]
})
export class ApsstrCoreModule { }
