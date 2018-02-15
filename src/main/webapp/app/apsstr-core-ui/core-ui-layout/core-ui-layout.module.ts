import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';

import { FooterComponent, HeaderComponent, SIDEBAR_NAV, SidebarComponent } from './components';
import { FullLayoutComponent } from './container';
import {
    AsideToggleDirective, NAV_DROPDOWN_DIRECTIVES, ReplaceDirective, SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const CORE_UI_CONTAINERS = [
  FullLayoutComponent
];

const CORE_UI_LAYOUT_COMPONENTS = [
  HeaderComponent,
  SidebarComponent,
  SIDEBAR_NAV,
  FooterComponent
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
