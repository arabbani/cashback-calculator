import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OperatingSystemComponent } from './operating-system.component';

export const operatingSystemRoute: Route = {
    path: 'operating-system',
    component: OperatingSystemComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'OperatingSystems'
    },
    canActivate: [UserRouteAccessService]
};
