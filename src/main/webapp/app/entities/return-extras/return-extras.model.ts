import { BaseEntity } from './../../shared';

export class ReturnExtras implements BaseEntity {
    constructor(
        public id?: number,
        public minimumExpense?: number,
        public maximumExpense?: number,
        public minimumReturn?: number,
        public maximumReturn?: number,
        public minimumTicketRequired?: number,
    ) {
    }
}
