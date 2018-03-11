import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbclSharedModule } from '../shared';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

import {
    adminState,
    AuditsComponent,
    UserMgmtComponent,
    UserDialogComponent,
    UserDeleteDialogComponent,
    UserMgmtDetailComponent,
    UserMgmtDialogComponent,
    UserMgmtDeleteDialogComponent,
    LogsComponent,
    ApsstrMetricsMonitoringModalComponent,
    ApsstrMetricsMonitoringComponent,
    ApsstrHealthModalComponent,
    ApsstrHealthCheckComponent,
    ApsstrConfigurationComponent,
    ApsstrDocsComponent,
    AuditsService,
    ApsstrConfigurationService,
    ApsstrHealthService,
    ApsstrMetricsService,
    LogsService,
    UserResolvePagingParams,
    UserResolve,
    UserModalService
} from './';

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
