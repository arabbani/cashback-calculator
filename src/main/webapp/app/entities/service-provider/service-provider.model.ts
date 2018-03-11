import { BaseEntity } from './../../shared';

export class ServiceProvider implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public subCategories?: BaseEntity[],
        public offers?: BaseEntity[],
    ) {
    }
}
