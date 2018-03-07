import { BaseEntity } from './../../shared';

export class MainReturn implements BaseEntity {
    constructor(
        public id?: number,
        public amount?: number,
        public exact?: boolean,
        public defaultAmount?: number,
        public mode?: BaseEntity,
        public channel?: BaseEntity,
    ) {
        this.exact = false;
    }
}
