import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RegionComponent } from './region.component';

export const regionRoute: Route = {
    path: 'region',
    component: RegionComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'Regions'
    },
    canActivate: [UserRouteAccessService]
};
