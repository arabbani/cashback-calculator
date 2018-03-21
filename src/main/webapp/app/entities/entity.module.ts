import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { CbclAffiliateCredentialModule } from './affiliate-credential/affiliate-credential.module';
import { CbclAffiliateModule } from './affiliate/affiliate.module';
import { CbclBankTypeModule } from './bank-type/bank-type.module';
import { CbclBankModule } from './bank/bank.module';
import { CbclBrandModule } from './brand/brand.module';
import { CbclCardTypeModule } from './card-type/card-type.module';
import { CbclCardModule } from './card/card.module';
import { CbclCategoryModule } from './category/category.module';
import { CbclCircleModule } from './circle/circle.module';
import { CbclCityModule } from './city/city.module';
import { CbclCountryModule } from './country/country.module';
import { CbclDateModule } from './date/date.module';
import { CbclDayModule } from './day/day.module';
import { EntityComponent } from './entity/entity.component';
import { CbclMerchantModule } from './merchant/merchant.module';
import { CbclNewsletterModule } from './newsletter/newsletter.module';
import { CbclOfferPolicyModule } from './offer-policy/offer-policy.module';
import { CbclOfferTypeModule } from './offer-type/offer-type.module';
import { CbclOfferModule } from './offer/offer.module';
import { CbclOperatingSystemTypeModule } from './operating-system-type/operating-system-type.module';
import { CbclOperatingSystemModule } from './operating-system/operating-system.module';
import { CbclReechargePlanTypeModule } from './reecharge-plan-type/reecharge-plan-type.module';
import { CbclRegionModule } from './region/region.module';
import { CbclReturnModeModule } from './return-mode/return-mode.module';
import { CbclReturnTypeModule } from './return-type/return-type.module';
import { CbclServiceProviderModule } from './service-provider/service-provider.module';
import { CbclStateModule } from './state/state.module';
import { CbclSubCategoryModule } from './sub-category/sub-category.module';
import { CbclTravelTypeModule } from './travel-type/travel-type.module';
import { CbclUserInfoModule } from './user-info/user-info.module';

import { CbclReturnExtrasModule } from './return-extras/return-extras.module';
import { CbclMainReturnModule } from './main-return/main-return.module';
import { CbclReturnInfoModule } from './return-info/return-info.module';
import { CbclOfferReturnModule } from './offer-return/offer-return.module';
import { CbclReechargeInfoModule } from './reecharge-info/reecharge-info.module';
import { CbclTravelInfoModule } from './travel-info/travel-info.module';
import { CbclOfferPaymentModule } from './offer-payment/offer-payment.module';
import { CbclElectronicsInfoModule } from './electronics-info/electronics-info.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        CbclMerchantModule,
        CbclAffiliateCredentialModule,
        CbclAffiliateModule,
        CbclOperatingSystemTypeModule,
        CbclOperatingSystemModule,
        CbclCountryModule,
        CbclStateModule,
        CbclCityModule,
        CbclOfferPolicyModule,
        CbclOfferTypeModule,
        CbclCategoryModule,
        CbclSubCategoryModule,
        CbclServiceProviderModule,
        CbclDateModule,
        CbclDayModule,
        CbclReturnTypeModule,
        CbclReturnModeModule,
        CbclCircleModule,
        CbclTravelTypeModule,
        CbclRegionModule,
        CbclBankTypeModule,
        CbclBankModule,
        CbclCardTypeModule,
        CbclCardModule,
        CbclReechargePlanTypeModule,
        CbclOfferModule,
        CbclNewsletterModule,
        CbclUserInfoModule,
        CbclBrandModule,
        RouterModule.forChild([
            {
                path: 'entities',
                component: EntityComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'Entities'
                },
                canActivate: [UserRouteAccessService]
            }
        ]),
        CommonModule,
        CbclReturnExtrasModule,
        CbclMainReturnModule,
        CbclReturnInfoModule,
        CbclOfferReturnModule,
        CbclReechargeInfoModule,
        CbclTravelInfoModule,
        CbclOfferPaymentModule,
        CbclElectronicsInfoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [EntityComponent],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclEntityModule { }
