import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MerchantComponent } from './merchant.component';

export const merchantRoute: Route = {
    path: 'merchant',
    component: MerchantComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'Merchants'
    },
    canActivate: [UserRouteAccessService]
};
