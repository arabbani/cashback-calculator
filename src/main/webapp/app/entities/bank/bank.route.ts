import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BankComponent } from './bank.component';

export const bankRoute: Route = {
    path: 'bank',
    component: BankComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'Banks'
    },
    canActivate: [UserRouteAccessService]
};
