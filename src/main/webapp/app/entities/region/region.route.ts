import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { RegionComponent } from './region.component';

export const regionRoute: Route = {
    path: 'region',
    component: RegionComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Regions'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
