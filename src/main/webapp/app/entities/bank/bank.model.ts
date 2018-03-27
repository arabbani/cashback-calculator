import { BankType, Card } from '..';

export class Bank {
    constructor(
        public id?: number,
        public name?: string,
        public cards?: Card[],
        public type?: BankType,
    ) {
    }
}
