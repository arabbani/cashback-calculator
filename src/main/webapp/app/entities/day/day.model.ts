import { BaseEntity } from './../../shared';

export class Day implements BaseEntity {
    constructor(
        public id?: number,
        public day?: string,
    ) {
    }
}
