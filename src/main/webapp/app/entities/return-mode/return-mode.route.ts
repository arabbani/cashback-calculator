import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ReturnModeComponent } from './return-mode.component';

export const returnModeRoute: Route =  {
    path: 'return-mode',
    component: ReturnModeComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'ReturnModes'
    },
    canActivate: [UserRouteAccessService]
};
