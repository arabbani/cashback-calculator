import { BaseEntity } from './../../shared';

export class Card implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public type?: BaseEntity,
        public cardProviders?: BaseEntity[],
        public bank?: BaseEntity,
    ) {
    }
}
