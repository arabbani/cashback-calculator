import { Component, OnInit } from '@angular/core';

import { AppStorageService } from '../services';

@Component({
  selector: 'apsstr-app-storage',
  templateUrl: './app-storage.component.html',
  styles: []
})
export class AppStorageComponent implements OnInit {

  constructor(private appStorageService: AppStorageService) { }

  ngOnInit() {
    this.appStorageService.initializeAppStorage();
  }

}
