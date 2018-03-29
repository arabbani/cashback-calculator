import { BaseEntity } from './../../shared';

export class ReturnType implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
