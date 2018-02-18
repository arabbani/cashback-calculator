import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';

import { CbclSharedModule } from '../../shared';
import {
    AffiliateComponent,
    AffiliateDeleteDialogComponent,
    AffiliateDeletePopupComponent,
    AffiliateDetailComponent,
    AffiliateDialogComponent,
    AffiliatePopupComponent,
    affiliatePopupRoute,
    AffiliatePopupService,
    affiliateRoute,
    AffiliateService,
} from './';

const ENTITY_STATES = [
    ...affiliateRoute,
    ...affiliatePopupRoute,
];

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        GridModule
    ],
    declarations: [
        AffiliateComponent,
        AffiliateDetailComponent,
        AffiliateDialogComponent,
        AffiliateDeleteDialogComponent,
        AffiliatePopupComponent,
        AffiliateDeletePopupComponent,
    ],
    entryComponents: [
        AffiliateComponent,
        AffiliateDialogComponent,
        AffiliatePopupComponent,
        AffiliateDeleteDialogComponent,
        AffiliateDeletePopupComponent,
    ],
    providers: [
        AffiliateService,
        AffiliatePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclAffiliateModule {}
