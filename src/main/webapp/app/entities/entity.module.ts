import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CbclMerchantModule } from './merchant/merchant.module';
import { CbclAffiliateCredentialModule } from './affiliate-credential/affiliate-credential.module';
import { CbclAffiliateModule } from './affiliate/affiliate.module';
import { CbclOperatingSystemTypeModule } from './operating-system-type/operating-system-type.module';
import { CbclOperatingSystemModule } from './operating-system/operating-system.module';
import { CbclCountryModule } from './country/country.module';
import { CbclStateModule } from './state/state.module';
import { CbclCityModule } from './city/city.module';
import { CbclOfferPolicyModule } from './offer-policy/offer-policy.module';
import { CbclOfferTypeModule } from './offer-type/offer-type.module';
import { CbclCategoryModule } from './category/category.module';
import { CbclSubCategoryModule } from './sub-category/sub-category.module';
import { CbclServiceProviderModule } from './service-provider/service-provider.module';
import { CbclDateModule } from './date/date.module';
import { CbclDayModule } from './day/day.module';
import { CbclReturnTypeModule } from './return-type/return-type.module';
import { CbclReturnModeModule } from './return-mode/return-mode.module';
import { CbclReturnExtrasModule } from './return-extras/return-extras.module';
import { CbclMainReturnModule } from './main-return/main-return.module';
import { CbclReturnInfoModule } from './return-info/return-info.module';
import { CbclOfferReturnModule } from './offer-return/offer-return.module';
import { CbclCircleModule } from './circle/circle.module';
import { CbclTravelTypeModule } from './travel-type/travel-type.module';
import { CbclRegionModule } from './region/region.module';
import { CbclReechargeInfoModule } from './reecharge-info/reecharge-info.module';
import { CbclTravelInfoModule } from './travel-info/travel-info.module';
import { CbclBankTypeModule } from './bank-type/bank-type.module';
import { CbclBankModule } from './bank/bank.module';
import { CbclCardTypeModule } from './card-type/card-type.module';
import { CbclCardModule } from './card/card.module';
import { CbclOfferPaymentModule } from './offer-payment/offer-payment.module';
import { CbclReechargePlanTypeModule } from './reecharge-plan-type/reecharge-plan-type.module';
import { CbclOfferModule } from './offer/offer.module';
import { CbclNewsletterModule } from './newsletter/newsletter.module';
import { CbclUserInfoModule } from './user-info/user-info.module';
import { CbclBrandModule } from './brand/brand.module';
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
        CbclReturnExtrasModule,
        CbclMainReturnModule,
        CbclReturnInfoModule,
        CbclOfferReturnModule,
        CbclCircleModule,
        CbclTravelTypeModule,
        CbclRegionModule,
        CbclReechargeInfoModule,
        CbclTravelInfoModule,
        CbclBankTypeModule,
        CbclBankModule,
        CbclCardTypeModule,
        CbclCardModule,
        CbclOfferPaymentModule,
        CbclReechargePlanTypeModule,
        CbclOfferModule,
        CbclNewsletterModule,
        CbclUserInfoModule,
        CbclBrandModule,
        CbclElectronicsInfoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclEntityModule {}
