package com.creatives.apsstr.cbcl.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.creatives.apsstr.cbcl.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.PersistentToken.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.User.class.getName() + ".persistentTokens", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.SocialUserConnection.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Merchant.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Merchant.class.getName() + ".offers", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Merchant.class.getName() + ".subCategories", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.AffiliateCredential.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Affiliate.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Affiliate.class.getName() + ".credentials", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Affiliate.class.getName() + ".offers", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.OperatingSystemType.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.OperatingSystem.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.State.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.State.class.getName() + ".cities", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.State.class.getName() + ".offers", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.City.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.City.class.getName() + ".users", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.City.class.getName() + ".offers", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.OfferPolicy.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.OfferType.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.OfferType.class.getName() + ".offers", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Category.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Category.class.getName() + ".subCategories", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.SubCategory.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.SubCategory.class.getName() + ".offers", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.SubCategory.class.getName() + ".serviceProviders", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.SubCategory.class.getName() + ".merchants", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.ServiceProvider.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.ServiceProvider.class.getName() + ".subCategories", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.ServiceProvider.class.getName() + ".offers", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Date.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Day.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.ReturnType.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.ReturnMode.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.ReturnExtras.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.MainReturn.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.ReturnInfo.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.OfferReturn.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.OfferReturn.class.getName() + ".returnInfos", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Circle.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.TravelType.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Region.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.ReechargeInfo.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.ReechargeInfo.class.getName() + ".circles", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.ReechargeInfo.class.getName() + ".reechargeTypes", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.TravelInfo.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.TravelInfo.class.getName() + ".types", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.TravelInfo.class.getName() + ".regions", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.TravelInfo.class.getName() + ".origins", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.BankType.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Bank.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Bank.class.getName() + ".cards", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.CardType.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Card.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.OfferPayment.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.OfferPayment.class.getName() + ".modes", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.OfferPayment.class.getName() + ".cards", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.ReechargePlanType.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Offer.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Offer.class.getName() + ".offerReturns", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Offer.class.getName() + ".operatingSystems", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Offer.class.getName() + ".countries", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Offer.class.getName() + ".cities", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Offer.class.getName() + ".subCategories", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Offer.class.getName() + ".serviceProviders", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Offer.class.getName() + ".activeDates", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Offer.class.getName() + ".activeDays", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.UserInfo.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.UserInfo.class.getName() + ".merchants", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.UserInfo.class.getName() + ".cards", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.UserInfo.class.getName() + ".operatingSystems", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Brand.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Brand.class.getName() + ".subCategories", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.ElectronicsInfo.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.ElectronicsInfo.class.getName() + ".brands", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.FlightClass.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.ReechargeInfo.class.getName() + ".reechargePlanTypes", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.FlightInfo.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.FlightInfo.class.getName() + ".types", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.FlightInfo.class.getName() + ".origins", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.FlightInfo.class.getName() + ".travelClasses", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.BusInfo.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.BusInfo.class.getName() + ".froms", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.BusInfo.class.getName() + ".tos", jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.CardProvider.class.getName(), jcacheConfiguration);
            cm.createCache(com.creatives.apsstr.cbcl.domain.Card.class.getName() + ".cardProviders", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
