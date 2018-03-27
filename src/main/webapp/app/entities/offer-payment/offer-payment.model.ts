import { Card } from '..';

export class OfferPayment {
    constructor(
        public id?: number,
        public cards?: Card[],
    ) {
    }
}
