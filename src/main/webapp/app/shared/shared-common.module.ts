import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { LOCALE_ID, NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApsstrAlertComponent, ApsstrAlertErrorComponent, CbclSharedLibsModule } from './';

@NgModule({
    imports: [
        CbclSharedLibsModule
    ],
    declarations: [
        ApsstrAlertComponent,
        ApsstrAlertErrorComponent
    ],
    exports: [
        CbclSharedLibsModule,
        ApsstrAlertComponent,
        ApsstrAlertErrorComponent
    ]
})
export class CbclSharedCommonModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CbclSharedCommonModule,
            providers: [
                Title,
                {
                    provide: LOCALE_ID,
                    useValue: 'en'
                },
            ],
        };
    }

    constructor() {
        registerLocaleData(locale);
    }

}
