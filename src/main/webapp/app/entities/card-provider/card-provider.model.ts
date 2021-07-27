import { BaseEntity } from './../../shared';

export class CardProvider implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
