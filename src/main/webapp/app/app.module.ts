import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { CbclSharedModule, UserRouteAccessService } from './shared';
import { CbclAppRoutingModule} from './app-routing.module';
import { CbclHomeModule } from './home/home.module';
import { CbclAdminModule } from './admin/admin.module';
import { CbclAccountModule } from './account/account.module';
import { CbclEntityModule } from './entities/entity.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { StateStorageService } from './shared/auth/state-storage.service';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    ApsstrMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';
import { CoreUiLayoutModule, ApsstrCoreModule } from './apsstr-core-ui';

@NgModule({
    imports: [
        BrowserModule,
        CbclAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'cbcl', separator: '-'}),
        CbclSharedModule,
        CbclHomeModule,
        CbclAdminModule,
        CbclAccountModule,
        CbclEntityModule,
        CoreUiLayoutModule,
        ApsstrCoreModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        ApsstrMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                StateStorageService,
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [ ApsstrMainComponent ]
})
export class CbclAppModule {}
