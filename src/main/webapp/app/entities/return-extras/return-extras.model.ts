import { BaseEntity } from './../../shared';

export class ReturnExtras implements BaseEntity {
    constructor(
        public id?: number,
        public minimumExpense?: number,
        public exact?: boolean,
        public maximumExpense?: number,
        public minimumReturn?: number,
        public maximumReturn?: number,
        public minimumTicketRequired?: number,
        public minimumRideRequired?: number,
    ) {
        this.exact = false;
    }
}
