import { BaseEntity } from './../../shared';

export class OfferPolicy implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
    ) {
    }
}
