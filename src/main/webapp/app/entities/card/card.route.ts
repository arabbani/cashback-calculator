import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CardComponent } from './card.component';

export const cardRoute: Route = {
    path: 'card',
    component: CardComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'Cards'
    },
    canActivate: [UserRouteAccessService]
};
