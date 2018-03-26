import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { StateComponent } from './state.component';

export const stateRoute: Route = {
    path: 'state',
    component: StateComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'States'
    },
    canActivate: [UserRouteAccessService]
};
