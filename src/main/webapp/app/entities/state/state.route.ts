import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { StateComponent } from './state.component';

export const stateRoute: Route = {
    path: 'state',
    component: StateComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'States'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
