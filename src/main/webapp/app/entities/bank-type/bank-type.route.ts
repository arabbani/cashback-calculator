import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BankTypeComponent } from './bank-type.component';

export const bankTypeRoute: Route = {
    path: 'bank-type',
    component: BankTypeComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'BankTypes'
    },
    canActivate: [UserRouteAccessService]
};
