import { BaseEntity } from './../../shared';

export class Date implements BaseEntity {
    constructor(
        public id?: number,
        public date?: number,
    ) {
    }
}
