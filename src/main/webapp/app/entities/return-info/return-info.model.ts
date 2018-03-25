import { BaseEntity } from './../../shared';

export class ReturnInfo implements BaseEntity {
    constructor(
        public id?: number,
        public mainReturn?: BaseEntity,
        public extras?: BaseEntity,
        public type?: BaseEntity,
        public returnOffer?: BaseEntity,
        public offerReturn?: BaseEntity,
    ) {
    }
}
