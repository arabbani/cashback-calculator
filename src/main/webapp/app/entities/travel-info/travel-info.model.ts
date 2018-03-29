import { BaseEntity } from './../../shared';

export class TravelInfo implements BaseEntity {
    constructor(
        public id?: number,
        public flightInfo?: BaseEntity,
        public busInfo?: BaseEntity,
        public types?: BaseEntity[],
    ) {
    }
}
