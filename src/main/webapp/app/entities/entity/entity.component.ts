import { Component, OnInit } from '@angular/core';
import { ENTITIES } from '../../apsstr-core-ui-config';

@Component({
  selector: 'apsstr-entity',
  templateUrl: './entity.component.html',
  styles: []
})
export class EntityComponent implements OnInit {
  entities = ENTITIES;

  constructor() { }

  ngOnInit() {
  }

}
