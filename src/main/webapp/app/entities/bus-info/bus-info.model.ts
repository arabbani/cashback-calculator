import { City } from '..';

export class BusInfo {
    constructor(
        public id?: number,
        public froms?: City[],
        public tos?: City[],
    ) {
    }
}
