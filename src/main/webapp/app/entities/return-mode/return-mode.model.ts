import { BaseEntity } from './../../shared';

export class ReturnMode implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
