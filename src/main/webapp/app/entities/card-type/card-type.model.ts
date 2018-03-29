import { BaseEntity } from './../../shared';

export class CardType implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
