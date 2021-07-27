import { BaseEntity } from './../../shared';

export class OfferPayment implements BaseEntity {
    constructor(
        public id?: number,
        public cards?: BaseEntity[],
    ) {
    }
}
