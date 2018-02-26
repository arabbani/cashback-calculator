import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';

import { CbclSharedModule } from '../../shared';
import { NewsletterComponent, newsletterRoute, NewsletterService } from './';

const ENTITY_STATES = [
    newsletterRoute
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        GridModule,
    ],
    declarations: [
        NewsletterComponent
    ],
    entryComponents: [
        NewsletterComponent
    ],
    providers: [
        NewsletterService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclNewsletterModule {}
