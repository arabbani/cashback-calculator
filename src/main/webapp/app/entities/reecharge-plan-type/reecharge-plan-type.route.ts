import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ReechargePlanTypeComponent } from './reecharge-plan-type.component';

export const reechargePlanTypeRoute: Route = {
    path: 'reecharge-plan-type',
    component: ReechargePlanTypeComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'ReechargePlanTypes'
    },
    canActivate: [UserRouteAccessService]
};
