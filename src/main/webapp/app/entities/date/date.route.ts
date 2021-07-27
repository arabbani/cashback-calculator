import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { DateComponent } from './date.component';

export const dateRoute: Route = {
    path: 'date',
    component: DateComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Dates'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
