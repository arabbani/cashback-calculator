import { BaseEntity } from './../../shared';

export class Newsletter implements BaseEntity {
    constructor(
        public id?: number,
        public emailId?: string,
        public phoneNumber?: number,
        public mailPerWeek?: number,
        public numberOfMailsSent?: number,
        public active?: boolean,
    ) {
        this.active = false;
    }
}
