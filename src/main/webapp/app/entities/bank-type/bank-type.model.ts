import { BaseEntity } from './../../shared';

export class BankType implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
