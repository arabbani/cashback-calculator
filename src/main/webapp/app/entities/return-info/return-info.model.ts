import { Offer, OfferPayment, OfferReturn, ReturnExtras, ReturnType } from '..';
import { MainReturn } from '../main-return';

export class ReturnInfo {
    constructor(
        public id?: number,
        public mainReturn?: MainReturn,
        public extras?: ReturnExtras,
        public payment?: OfferPayment,
        public type?: ReturnType,
        public returnOffer?: Offer,
        public offerReturn?: OfferReturn,
    ) {
    }
}
