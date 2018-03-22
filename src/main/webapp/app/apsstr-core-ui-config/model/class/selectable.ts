import { IOption } from 'ng-select';

export class Selectable implements IOption {

    constructor(
        public value: any,
        public label: string
    ) {}
}
