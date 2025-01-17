import { BaseEntity } from './../../shared';

export class OfferReturn implements BaseEntity {
    constructor(
        public id?: number,
        public extras?: BaseEntity,
        public returnInfos?: BaseEntity[],
        public offer?: BaseEntity,
    ) {
    }
}
