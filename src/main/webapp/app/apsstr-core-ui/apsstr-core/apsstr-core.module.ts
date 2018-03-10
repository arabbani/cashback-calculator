import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from '@progress/kendo-angular-dialog';

import { ApsstrKendoDialogService, AssetPathService, FilterEntitiesByRelationService } from './services';

@NgModule({
  imports: [
    CommonModule,
    DialogModule
  ],
  providers: [
    AssetPathService,
    ApsstrKendoDialogService,
    FilterEntitiesByRelationService
  ]
})
export class ApsstrCoreModule { }
