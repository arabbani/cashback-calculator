import { Injectable } from '@angular/core';

import { Selectable } from '../../../apsstr-core-ui-config';

@Injectable()
export class SelectableService {

  constructor() { }

  public toSelectable(objects: any, labelField: string): Selectable[] {
    const selectable: Selectable[] = [];
    for (const object of objects) {
      selectable.push(new Selectable(object.id, object[labelField]));
    }
    return selectable;
  }

}
