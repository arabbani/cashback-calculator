import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class DeserializeEntityService {

  constructor() { }

  public deserialize(objects: any, properties: [string]) {
    let deserializedObjects = objects;
    properties.forEach((property) => {
      deserializedObjects = this.deserializeObject(deserializedObjects, property);
    });
    return deserializedObjects;
  }

  private deserializeObject(objects: any, property: string) {

    const final = [], temp = [], bad = [];
    let c = {};

    // split original array into 3: final, bad, & temp
    while (objects.length > 0) {
      c = objects.pop();
      if (c.hasOwnProperty(property)) {
        if (typeof c[property] === 'number') {
          temp.push(c);
        } else {
          final.push(c);
        }
      } else {
        bad.push(c);
      }
    }

    // loop through temp & look up @id within final
    while (temp.length > 0) {
      c = temp.pop();
      // should @id be 1-of-a-kind?
      const found = this.getObjects(final, '@id', c[property]);
      if (found.length) {
        c[property] = found[0];
        final.push(c);
      } else {
        bad.push(c);
      }
    }
    return final;
  }

  private getObjects(obj, key, val) {
    let objects = [];
    for (const i in obj) {
      if (!obj.hasOwnProperty(i)) {
        continue;
      }
      if (typeof obj[i] === 'object') {
        objects = objects.concat(this.getObjects(obj[i], key, val));
      } else if (i === key && obj[key] === val) {
        objects.push(obj);
      }
    }
    return objects;
  }

}
