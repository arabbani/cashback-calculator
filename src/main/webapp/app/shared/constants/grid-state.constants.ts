import { State } from '@progress/kendo-data-query';

import { ITEMS_PER_PAGE } from '..';

export const GRID_STATE: State = {
    skip: 0,
    take: ITEMS_PER_PAGE
};
