import { City } from '..';

export class State {
    constructor(
        public id?: number,
        public name?: string,
        public cities?: City[],
    ) {
    }
}
