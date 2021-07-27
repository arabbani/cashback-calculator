import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { DayComponent } from './day.component';

export const dayRoute: Route = {
    path: 'day',
    component: DayComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Days'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
