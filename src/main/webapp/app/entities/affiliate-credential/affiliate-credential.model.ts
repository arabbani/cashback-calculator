import { Affiliate } from '..';

export class AffiliateCredential {
    constructor(
        public id?: number,
        public trackingId?: string,
        public token?: string,
        public apiKey?: string,
        public active?: boolean,
        public affiliate?: Affiliate,
    ) {
        this.active = false;
    }
}
