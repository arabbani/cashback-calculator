import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullLayoutComponent } from './container';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components';
import { AsideToggleDirective, NAV_DROPDOWN_DIRECTIVES, ReplaceDirective, SIDEBAR_TOGGLE_DIRECTIVES } from './directives';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';

const CORE_UI_CONTAINERS = [
  FullLayoutComponent
];

const CORE_UI_LAYOUT_COMPONENTS = [
  HeaderComponent
];

const CORE_UI_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot()
  ],
  declarations: [
    ...CORE_UI_CONTAINERS,
    ...CORE_UI_LAYOUT_COMPONENTS,
    ...CORE_UI_DIRECTIVES
  ],
  exports: [
    ...CORE_UI_CONTAINERS
  ]
})
export class CoreUiLayoutModule { }
