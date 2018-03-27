import { BaseEntity } from './../../shared';
import { SubCategory, Offer } from '..';

export class Merchant implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public url?: string,
        public active?: boolean,
        public offers?: Offer[],
        public subCategories?: SubCategory[],
    ) {
        this.active = false;
    }
}
