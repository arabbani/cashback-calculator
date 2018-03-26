import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DayComponent } from './day.component';

export const dayRoute: Route = {
    path: 'day',
    component: DayComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'Days'
    },
    canActivate: [UserRouteAccessService]
};
