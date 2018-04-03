import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { CardProviderComponent } from './card-provider.component';

export const cardProviderRoute: Route = {
    path: 'card-provider',
    component: CardProviderComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Card Providers'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
