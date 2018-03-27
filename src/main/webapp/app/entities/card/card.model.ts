import { Bank, CardType } from '..';
import { CardProvider } from '../card-provider';

export class Card {
    constructor(
        public id?: number,
        public name?: string,
        public type?: CardType,
        public cardProviders?: CardProvider[],
        public bank?: Bank,
    ) {
    }
}
