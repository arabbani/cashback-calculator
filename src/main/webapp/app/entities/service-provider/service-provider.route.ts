import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { ServiceProviderComponent } from './service-provider.component';

export const serviceProviderRoute: Route = {
    path: 'service-provider',
    component: ServiceProviderComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Service Providers'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
