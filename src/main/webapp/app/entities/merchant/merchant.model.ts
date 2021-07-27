import { BaseEntity } from './../../shared';

export class Merchant implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public url?: string,
        public active?: boolean,
        public offers?: BaseEntity[],
        public subCategories?: BaseEntity[],
    ) {
        this.active = false;
    }
}
