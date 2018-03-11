import { BaseEntity } from './../../shared';

export class TravelType implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
