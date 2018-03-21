import { BaseEntity, User } from './../../shared';

export class UserInfo implements BaseEntity {
    constructor(
        public id?: number,
        public city?: BaseEntity,
        public user?: User,
        public merchants?: BaseEntity[],
        public cards?: BaseEntity[],
        public operatingSystems?: BaseEntity[],
    ) {
    }
}
