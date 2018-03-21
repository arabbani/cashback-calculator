import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ReturnTypeComponent } from './return-type.component';

export const returnTypeRoute: Route = {
    path: 'return-type',
    component: ReturnTypeComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'ReturnTypes'
    },
    canActivate: [UserRouteAccessService]
};
