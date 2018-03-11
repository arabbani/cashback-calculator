import { BaseEntity } from './../../shared';

export class City implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public users?: BaseEntity[],
        public state?: BaseEntity,
        public offers?: BaseEntity[],
    ) {
    }
}
