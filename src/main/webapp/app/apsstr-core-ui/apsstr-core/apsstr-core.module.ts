import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from '@progress/kendo-angular-dialog';

import {
  ApsstrDialogService,
  ApsstrMetaService,
  AssetPathService,
  FilterEntitiesService,
  SelectableService,
} from './services';

@NgModule({
  imports: [
    CommonModule,
    DialogModule
  ],
  providers: [
    AssetPathService,
    ApsstrDialogService,
    FilterEntitiesService,
    SelectableService,
    ApsstrMetaService
  ]
})
export class ApsstrCoreModule { }
