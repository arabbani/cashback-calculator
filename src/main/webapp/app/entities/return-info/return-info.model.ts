import { BaseEntity } from './../../shared';

export class ReturnInfo implements BaseEntity {
    constructor(
        public id?: number,
        public type?: BaseEntity,
        public mainReturn?: BaseEntity,
        public extras?: BaseEntity,
        public payment?: BaseEntity,
        public returnOffer?: BaseEntity,
        public offerReturn?: BaseEntity,
    ) {
    }
}
