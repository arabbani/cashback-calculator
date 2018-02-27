import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ServiceProviderComponent } from './service-provider.component';

export const serviceProviderRoute: Route = {
    path: 'service-provider',
    component: ServiceProviderComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'ServiceProviders'
    },
    canActivate: [UserRouteAccessService]
};
