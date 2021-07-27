import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { OperatingSystemComponent } from './operating-system.component';

export const operatingSystemRoute: Route = {
    path: 'operating-system',
    component: OperatingSystemComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Operating Systems'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
