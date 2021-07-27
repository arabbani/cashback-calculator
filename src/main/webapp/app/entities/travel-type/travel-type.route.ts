import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { TravelTypeComponent } from './travel-type.component';

export const travelTypeRoute: Route = {
    path: 'travel-type',
    component: TravelTypeComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Travel types'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
