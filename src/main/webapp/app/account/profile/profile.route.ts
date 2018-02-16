import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../shared';
import { ProfileComponent } from './';

export const profileRoute: Route = {
    path: 'profile',
    component: ProfileComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Settings'
    },
    canActivate: [UserRouteAccessService]
};