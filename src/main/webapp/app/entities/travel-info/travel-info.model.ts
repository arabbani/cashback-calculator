import { BaseEntity } from './../../shared';

export class TravelInfo implements BaseEntity {
    constructor(
        public id?: number,
        public types?: BaseEntity[],
        public regions?: BaseEntity[],
        public origins?: BaseEntity[],
    ) {
    }
}
