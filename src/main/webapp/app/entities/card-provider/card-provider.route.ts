import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CardProviderComponent } from './card-provider.component';

export const cardProviderRoute: Route = {
    path: 'card-provider',
    component: CardProviderComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'CardProviders'
    },
    canActivate: [UserRouteAccessService]
};
