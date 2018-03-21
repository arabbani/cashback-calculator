import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OperatingSystemTypeComponent } from './operating-system-type.component';

export const operatingSystemTypeRoute: Route = {
    path: 'operating-system-type',
    component: OperatingSystemTypeComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'OperatingSystemTypes'
    },
    canActivate: [UserRouteAccessService]
};
