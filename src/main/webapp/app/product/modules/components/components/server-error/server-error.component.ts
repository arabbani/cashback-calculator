import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'apsstr-server-error',
  templateUrl: './server-error.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
