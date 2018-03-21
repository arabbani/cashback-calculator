import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DateComponent } from './date.component';

export const dateRoute: Route = {
    path: 'date',
    component: DateComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'Dates'
    },
    canActivate: [UserRouteAccessService]
};
