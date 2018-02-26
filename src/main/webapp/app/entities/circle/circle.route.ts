import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CircleComponent } from './circle.component';

export const circleRoute: Route = {
    path: 'circle',
    component: CircleComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'Circles'
    },
    canActivate: [UserRouteAccessService]
};
