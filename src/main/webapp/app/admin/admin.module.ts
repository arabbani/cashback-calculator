import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../shared';
import {
    adminState,
    ApsstrConfigurationComponent,
    ApsstrConfigurationService,
    ApsstrDocsComponent,
    ApsstrHealthCheckComponent,
    ApsstrHealthModalComponent,
    ApsstrHealthService,
    ApsstrMetricsMonitoringComponent,
    ApsstrMetricsMonitoringModalComponent,
    ApsstrMetricsService,
    AuditsComponent,
    AuditsService,
    LogsComponent,
    LogsService,
    UserDeleteDialogComponent,
    UserDialogComponent,
    UserMgmtComponent,
    UserMgmtDeleteDialogComponent,
    UserMgmtDetailComponent,
    UserMgmtDialogComponent,
    UserModalService,
    UserResolve,
    UserResolvePagingParams,
} from './';

/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

@NgModule({
    imports: [
        CbclSharedModule,
        RouterModule.forChild(adminState),
        /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    ],
    declarations: [
        AuditsComponent,
        UserMgmtComponent,
        UserDialogComponent,
        UserDeleteDialogComponent,
        UserMgmtDetailComponent,
        UserMgmtDialogComponent,
        UserMgmtDeleteDialogComponent,
        LogsComponent,
        ApsstrConfigurationComponent,
        ApsstrHealthCheckComponent,
        ApsstrHealthModalComponent,
        ApsstrDocsComponent,
        ApsstrMetricsMonitoringComponent,
        ApsstrMetricsMonitoringModalComponent
    ],
    entryComponents: [
        UserMgmtDialogComponent,
        UserMgmtDeleteDialogComponent,
        ApsstrHealthModalComponent,
        ApsstrMetricsMonitoringModalComponent,
    ],
    providers: [
        AuditsService,
        ApsstrConfigurationService,
        ApsstrHealthService,
        ApsstrMetricsService,
        LogsService,
        UserResolvePagingParams,
        UserResolve,
        UserModalService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclAdminModule {}
