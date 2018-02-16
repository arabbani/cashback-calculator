import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent
} from './components';

const COMPONENTS = [
  CardComponent, CardBodyComponent, CardHeaderComponent, CardFooterComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ApsstrSharedModule { }
