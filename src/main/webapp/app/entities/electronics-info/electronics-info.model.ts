import { Brand } from '..';

export class ElectronicsInfo {
    constructor(
        public id?: number,
        public brands?: Brand[],
    ) {
    }
}
