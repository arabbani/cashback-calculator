import { Card, City, Merchant, OperatingSystem } from '..';

export class UserInfo {
    constructor(
        public id?: number,
        public city?: City,
        public merchants?: Merchant[],
        public cards?: Card[],
        public operatingSystems?: OperatingSystem[],
    ) {
    }
}
