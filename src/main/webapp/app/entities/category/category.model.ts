import { SubCategory } from '..';

export class Category {
    constructor(
        public id?: number,
        public name?: string,
        public subCategories?: SubCategory[],
    ) {
    }
}
