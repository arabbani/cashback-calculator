import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SettingsComponent } from './settings.component';

export const settingsRoute: Route = {
    path: 'profile',
    component: SettingsComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Settings'
    },
    canActivate: [UserRouteAccessService]
};
