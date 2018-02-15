import { Component, OnInit } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../../../apsstr-core-ui-config';

@Component({
  selector: 'apsstr-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit {

  appConfig: AppConfig;

  constructor() { }

  ngOnInit() {
    this.appConfig = APP_CONFIG;
  }

}
