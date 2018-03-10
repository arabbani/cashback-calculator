import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class FilterEntitiesByRelationService {

  constructor() { }

  forSingleRelationId<T, U>(referenceEntities: T[], filterEntities: U[], relationName: string): U[] {
    const filtered = [];
    _.forEach(referenceEntities, (referenceEntity) => {
      filtered.push(..._.filter(filterEntities, (filterEntity) => filterEntity[relationName].id === referenceEntity.id));
    });
    return filtered;
  }

  forManyRelationId<T, U>(referenceEntities: T[], filterEntities: U[], relationName: string): U[] {
    let filtered = [];
    _.forEach(referenceEntities, (referenceEntity) => {
      const arr = _.filter(filterEntities, (filterEntity) => {
        const found = _.find(filterEntity[relationName], (relation) => relation.id === referenceEntity.id);
        if (found) {
          return true;
        }
        return false;
      });
      filtered = _.union(filtered, arr);
    });
    return filtered;
  }

}
