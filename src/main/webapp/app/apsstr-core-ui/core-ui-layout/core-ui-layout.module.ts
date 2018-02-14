import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullLayoutComponent } from './container';

const CORE_UI_CONTAINERS = [
  FullLayoutComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...CORE_UI_CONTAINERS
  ],
  exports: [
    ...CORE_UI_CONTAINERS
  ]
})
export class CoreUiLayoutModule { }
