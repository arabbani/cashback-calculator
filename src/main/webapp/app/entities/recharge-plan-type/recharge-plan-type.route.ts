import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { RechargePlanTypeComponent } from './recharge-plan-type.component';

export const rechargePlanTypeRoute: Route = {
    path: 'recharge-plan-type',
    component: RechargePlanTypeComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Recharge Plan Types'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
