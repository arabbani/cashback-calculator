import { BaseEntity } from './../../shared';

export class SubCategory implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public category?: BaseEntity,
        public offers?: BaseEntity[],
        public serviceProviders?: BaseEntity[],
        public merchants?: BaseEntity[],
    ) {
    }
}
