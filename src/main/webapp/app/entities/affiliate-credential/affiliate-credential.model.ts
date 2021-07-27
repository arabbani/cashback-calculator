import { BaseEntity } from './../../shared';

export class AffiliateCredential implements BaseEntity {
    constructor(
        public id?: number,
        public trackingId?: string,
        public token?: string,
        public apiKey?: string,
        public active?: boolean,
        public affiliate?: BaseEntity,
    ) {
        this.active = false;
    }
}
