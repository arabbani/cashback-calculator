import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { CityComponent } from './city.component';

export const cityRoute: Route = {
    path: 'city',
    component: CityComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Cities'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
