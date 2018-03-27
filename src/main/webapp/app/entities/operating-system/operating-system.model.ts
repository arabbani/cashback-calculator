import { OperatingSystemType } from '..';

export class OperatingSystem {
    constructor(
        public id?: number,
        public name?: string,
        public type?: OperatingSystemType,
    ) {
    }
}
