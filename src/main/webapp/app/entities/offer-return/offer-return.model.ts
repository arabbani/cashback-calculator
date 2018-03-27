import { Offer, ReturnExtras, ReturnInfo } from '..';

export class OfferReturn {
    constructor(
        public id?: number,
        public extras?: ReturnExtras,
        public returnInfos?: ReturnInfo[],
        public offer?: Offer,
    ) {
    }
}
