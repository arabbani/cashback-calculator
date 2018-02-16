import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';

import {
    AlertComponent, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent
} from './components';

const COMPONENTS = [
  CardComponent, CardBodyComponent, CardHeaderComponent, CardFooterComponent, AlertComponent
];

@NgModule({
  imports: [
    CommonModule,
    AlertModule.forRoot()
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ApsstrSharedModule { }
