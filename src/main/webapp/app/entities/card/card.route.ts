import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { CardComponent } from './card.component';

export const cardRoute: Route = {
    path: 'card',
    component: CardComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Cards'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
