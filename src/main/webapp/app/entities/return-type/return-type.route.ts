import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { ReturnTypeComponent } from './return-type.component';

export const returnTypeRoute: Route = {
    path: 'return-type',
    component: ReturnTypeComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Return Types'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
