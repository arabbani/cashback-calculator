import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { OperatingSystemTypeComponent } from './operating-system-type.component';

export const operatingSystemTypeRoute: Route = {
    path: 'operating-system-type',
    component: OperatingSystemTypeComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Operating System Types'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
