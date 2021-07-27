import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'apsstr-alert-new',
  templateUrl: './alert.component.html',
  styles: []
})
export class AlertComponent implements OnInit {

  @Input() type: string;
  @Input() dismissible: boolean;
  @Input() dismissOnTimeout: number;

  constructor() { }

  ngOnInit() {
  }

}
