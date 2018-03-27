import { SubCategory } from '..';

export class Brand {
    constructor(
        public id?: number,
        public name?: string,
        public subCategories?: SubCategory[],
    ) {
    }
}
