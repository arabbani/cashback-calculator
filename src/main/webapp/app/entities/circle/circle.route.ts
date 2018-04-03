import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { CircleComponent } from './circle.component';

export const circleRoute: Route = {
    path: 'circle',
    component: CircleComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Circles'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
