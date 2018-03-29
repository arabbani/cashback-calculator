import { BaseEntity } from './../../shared';

export class FlightClass implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
