import './vendor.ts';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsogService } from 'jsog-typescript/dist';
import { JhiEventManager } from 'ng-jhipster';
import { Ng2Webstorage } from 'ngx-webstorage';

import { CbclAccountModule } from './account/account.module';
import { CbclAdminModule } from './admin/admin.module';
import { CbclAppRoutingModule } from './app-routing.module';
import { ApsstrCoreModule, CoreUiLayoutModule } from './apsstr-core-ui';
import { APP_CONFIG } from './apsstr-core-ui-config';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { CbclEntityModule } from './entities/entity.module';
import { CbclHomeModule } from './home/home.module';
import { ApsstrMainComponent, ErrorComponent, PageRibbonComponent, ProfileService } from './layouts';
import { CashbackModule, ProductCoreModule } from './product';
import { CbclSharedModule, UserRouteAccessService } from './shared';
import { StateStorageService } from './shared/auth/state-storage.service';

// jhipster-needle-angular-add-module-import JHipster will add new module here
@NgModule({
    imports: [
        BrowserModule,
        CbclAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: APP_CONFIG.appStorageName , separator: '-'}),
        CbclSharedModule.forRoot(),
        CbclHomeModule,
        CbclAdminModule,
        CbclAccountModule,
        CbclEntityModule,
        CoreUiLayoutModule,
        ApsstrCoreModule,
        BrowserAnimationsModule,
        ProductCoreModule,
        CashbackModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        ApsstrMainComponent,
        ErrorComponent,
        PageRibbonComponent
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
        },
        JsogService
    ],
    bootstrap: [ ApsstrMainComponent ]
})
export class CbclAppModule {}
