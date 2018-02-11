import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en';

import {
    CbclSharedLibsModule,
    ApsstrAlertComponent,
    ApsstrAlertErrorComponent
} from './';

@NgModule({
    imports: [
        CbclSharedLibsModule
    ],
    declarations: [
        ApsstrAlertComponent,
        ApsstrAlertErrorComponent
    ],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
    ],
    exports: [
        CbclSharedLibsModule,
        ApsstrAlertComponent,
        ApsstrAlertErrorComponent
    ]
})
export class CbclSharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
