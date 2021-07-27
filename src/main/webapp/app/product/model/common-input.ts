import { Expense } from './expense';

export class CommonInput {

    public subCategoryId: number;
    public dateTime: any;
    public expense: Expense;
    public activeDate: number;
    public activeDay: string;
    public merchantIds: Array<number>;

    constructor() {
        this.expense = new Expense();
    }
}
