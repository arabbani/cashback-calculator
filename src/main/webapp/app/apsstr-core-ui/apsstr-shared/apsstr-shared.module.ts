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

const COMPONENTS = [
  CardComponent, CardBodyComponent, CardHeaderComponent, CardFooterComponent, AlertComponent, DropDownListFilterComponent
];

@NgModule({
  imports: [
    CommonModule,
    AlertModule.forRoot(),
    DropDownListModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ApsstrSharedModule { }
