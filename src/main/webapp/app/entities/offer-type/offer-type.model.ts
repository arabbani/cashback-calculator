import { BaseEntity } from './../../shared';

export class OfferType implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public offers?: BaseEntity[],
    ) {
    }
}
