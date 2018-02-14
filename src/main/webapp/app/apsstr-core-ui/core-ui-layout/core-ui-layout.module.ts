import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullLayoutComponent } from './container';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components';

const CORE_UI_CONTAINERS = [
  FullLayoutComponent
];

const CORE_UI_LAYOUT_COMPONENTS = [
  HeaderComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ...CORE_UI_CONTAINERS,
    ...CORE_UI_LAYOUT_COMPONENTS
  ],
  exports: [
    ...CORE_UI_CONTAINERS
  ]
})
export class CoreUiLayoutModule { }
