import { Route } from '@angular/router';

import { HomeComponent } from './';
import { MetaGuard } from '@ngx-meta/core';

export const HOME_ROUTE: Route = {
    path: '',
    component: HomeComponent,
    canActivate: [MetaGuard],
    data: {
        authorities: [],
        meta: {
            title: 'Sweet home',
            description: 'Home, home sweet home... and what?'
        }
    }
};
