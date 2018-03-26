import { Expense } from './expense';

export class CommonInput {

    public subCategoryId: number;
    public serviceProviderId: number;
    public dateTime: any;
    public expense: Expense;

    constructor() {
        this.expense = new Expense();
    }
}
