import { BaseEntity } from './../../shared';

export class FlightInfo implements BaseEntity {
    constructor(
        public id?: number,
        public types?: BaseEntity[],
        public origins?: BaseEntity[],
        public travelClasses?: BaseEntity[],
    ) {
    }
}
