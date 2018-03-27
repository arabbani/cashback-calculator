import { BaseEntity } from './../../shared';
import { SubCategory, Offer } from '..';

export class ServiceProvider {
    constructor(
        public id?: number,
        public name?: string,
        public subCategories?: SubCategory[],
        public offers?: Offer[],
    ) {
    }
}
