import { Category, Merchant, Offer, ServiceProvider } from '..';

export class SubCategory {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public category?: Category,
        public offers?: Offer[],
        public serviceProviders?: ServiceProvider[],
        public merchants?: Merchant[],
    ) {
    }
}
