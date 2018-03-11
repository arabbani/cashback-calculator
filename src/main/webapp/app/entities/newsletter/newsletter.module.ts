import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../../shared';
import {
    NewsletterService,
    NewsletterPopupService,
    NewsletterComponent,
    NewsletterDetailComponent,
    NewsletterDialogComponent,
    NewsletterPopupComponent,
    NewsletterDeletePopupComponent,
    NewsletterDeleteDialogComponent,
    newsletterRoute,
    newsletterPopupRoute,
} from './';

const ENTITY_STATES = [
    ...newsletterRoute,
    ...newsletterPopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NewsletterComponent,
        NewsletterDetailComponent,
        NewsletterDialogComponent,
        NewsletterDeleteDialogComponent,
        NewsletterPopupComponent,
        NewsletterDeletePopupComponent,
    ],
    entryComponents: [
        NewsletterComponent,
        NewsletterDialogComponent,
        NewsletterPopupComponent,
        NewsletterDeleteDialogComponent,
        NewsletterDeletePopupComponent,
    ],
    providers: [
        NewsletterService,
        NewsletterPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclNewsletterModule {}
