import { BaseEntity } from './../../shared';

export class UserInfo implements BaseEntity {
    constructor(
        public id?: number,
        public city?: BaseEntity,
        public merchants?: BaseEntity[],
        public cards?: BaseEntity[],
        public operatingSystems?: BaseEntity[],
    ) {
    }
}
