import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { NewsletterComponent } from './newsletter.component';
import { NewsletterDetailComponent } from './newsletter-detail.component';
import { NewsletterPopupComponent } from './newsletter-dialog.component';
import { NewsletterDeletePopupComponent } from './newsletter-delete-dialog.component';

export const newsletterRoute: Routes = [
    {
        path: 'newsletter',
        component: NewsletterComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Newsletters'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'newsletter/:id',
        component: NewsletterDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Newsletters'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const newsletterPopupRoute: Routes = [
    {
        path: 'newsletter-new',
        component: NewsletterPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Newsletters'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'newsletter/:id/edit',
        component: NewsletterPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Newsletters'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'newsletter/:id/delete',
        component: NewsletterDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Newsletters'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
