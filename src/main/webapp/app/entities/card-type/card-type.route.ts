import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CardTypeComponent } from './card-type.component';

export const cardTypeRoute: Route = {
    path: 'card-type',
    component: CardTypeComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'CardTypes'
    },
    canActivate: [UserRouteAccessService]
};
