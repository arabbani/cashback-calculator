import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { NewsletterComponent } from './newsletter.component';

export const newsletterRoute: Route = {
    path: 'newsletter',
    component: NewsletterComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'Newsletters'
    },
    canActivate: [UserRouteAccessService]
};
