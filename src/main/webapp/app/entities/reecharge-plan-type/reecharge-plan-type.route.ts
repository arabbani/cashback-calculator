import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { ReechargePlanTypeComponent } from './reecharge-plan-type.component';

export const reechargePlanTypeRoute: Route = {
    path: 'reecharge-plan-type',
    component: ReechargePlanTypeComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Reecharge Plan Types'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
