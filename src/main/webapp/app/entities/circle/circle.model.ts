import { BaseEntity } from './../../shared';

export class Circle implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
    ) {
    }
}
