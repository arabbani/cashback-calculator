import { Card, ReturnMode } from '..';

export class MainReturn {
    constructor(
        public id?: number,
        public amount?: number,
        public exact?: boolean,
        public defaultAmount?: number,
        public mode?: ReturnMode,
        public cashbackChannel?: Card,
    ) {
        this.exact = false;
    }
}
