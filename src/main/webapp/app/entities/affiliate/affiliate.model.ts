import { AffiliateCredential, Offer } from '..';

export class Affiliate {
    constructor(
        public id?: number,
        public name?: string,
        public url?: string,
        public active?: boolean,
        public credentials?: AffiliateCredential[],
        public offers?: Offer[],
    ) {
        this.active = false;
    }
}
