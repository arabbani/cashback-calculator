import { Offer } from '..';

export class OfferType {
    constructor(
        public id?: number,
        public name?: string,
        public offers?: Offer[],
    ) {
    }
}
