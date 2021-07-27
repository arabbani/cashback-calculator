import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { CardTypeComponent } from './card-type.component';

export const cardTypeRoute: Route = {
    path: 'card-type',
    component: CardTypeComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Card Types'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
