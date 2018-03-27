import { Offer, State } from '..';
import { UserInfo } from '../user-info';

export class City {
    constructor(
        public id?: number,
        public name?: string,
        public users?: UserInfo[],
        public state?: State,
        public offers?: Offer[],
    ) {
    }
}
