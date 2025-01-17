import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SessionsComponent } from './sessions.component';

export const sessionsRoute: Route = {
    path: 'sessions',
    component: SessionsComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Sessions'
        }
    },
    canActivate: [UserRouteAccessService]
};
