import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { AlertModule } from 'ngx-bootstrap';

import {
  AlertComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  DropDownListFilterComponent,
} from './components';
import { NumberInputDirective } from './directives';

const COMPONENTS = [
  CardComponent, CardBodyComponent, CardHeaderComponent, CardFooterComponent, AlertComponent, DropDownListFilterComponent
];

const DIRECTIVES = [
  NumberInputDirective
];

@NgModule({
  imports: [
    CommonModule,
    AlertModule.forRoot(),
    DropDownListModule
  ],
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class ApsstrSharedModule { }
