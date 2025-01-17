package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.Offer;
import com.creatives.apsstr.cbcl.helper.projections.OfferForReference;
import com.creatives.apsstr.cbcl.helper.projections.OfferWithInfo;
import com.creatives.apsstr.cbcl.helper.constants.OfferRepositoryConstants;

import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.repository.query.Param;
import java.util.List;

import javax.persistence.FetchType;

/**
 * Spring Data JPA repository for the Offer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {

        @EntityGraph(attributePaths = { "operatingSystems", "cities", "cities.state", "subCategories",
                        "subCategories.category", "serviceProviders", "merchant", "serviceProviders.subCategories",
                        "activeDates", "activeDays", "affiliate", "policy", "offerReturns",
                        "offerReturns.returnInfos.payment.cards.bank", "offerReturns.returnInfos.payment.cards.type" })
        Offer findOneForAdminViewById(Long id);

        @EntityGraph(attributePaths = { "rechargeInfo", "rechargeInfo.circles", "rechargeInfo.rechargePlanTypes" })
        Offer findOneWithRechargeInfoById(Long id);

        @EntityGraph(attributePaths = { "travelInfo", "travelInfo.types", "travelInfo.flightInfo",
                        "travelInfo.flightInfo.types", "travelInfo.flightInfo.origins",
                        "travelInfo.flightInfo.travelClasses" })
        Offer findOneWithFlightInfoById(Long id);

        @EntityGraph(attributePaths = { "travelInfo", "travelInfo.types", "travelInfo.busInfo",
                        "travelInfo.busInfo.froms", "travelInfo.busInfo.tos" })
        Offer findOneWithBusInfoById(Long id);

        @EntityGraph(attributePaths = { "travelInfo", "travelInfo.types", "travelInfo.hotelInfo",
                        "travelInfo.hotelInfo.types" })
        Offer findOneWithHotelInfoById(Long id);

        List<OfferForReference> findForReferenceByIdNotAndActiveTrueAndDummyFalse(Long id);

        List<OfferForReference> findForReferenceByActiveTrueAndDummyFalse();

        @Query(OfferRepositoryConstants.CASHBACK_RECHARGE_WITH_CHILDS)
        List<Offer> cashbackRechargeWithRechargeCondition(@Param("active") boolean active,
                        @Param("dummy") boolean dummy, @Param("dateTime") String dateTime,
                        @Param("activeDate") Integer activeDate, @Param("activeDay") String activeDay,
                        @Param("subCategoryId") Long subCategoryId, @Param("serviceProviderId") Long serviceProviderId,
                        @Param("circleId") Long circleId, @Param("rechargePlaneTypeId") Long rechargePlaneTypeId);

        @Query(OfferRepositoryConstants.CASHBACK_RECHARGE)
        List<Offer> cashbackRecharge(@Param("active") boolean active, @Param("dummy") boolean dummy,
                        @Param("dateTime") String dateTime, @Param("activeDate") Integer activeDate,
                        @Param("activeDay") String activeDay, @Param("subCategoryId") Long subCategoryId,
                        @Param("serviceProviderId") Long serviceProviderId);

        @Query(OfferRepositoryConstants.CASHBACK_FLIGHT)
        List<Offer> cashbackFlight(@Param("active") boolean active, @Param("dummy") boolean dummy,
                        @Param("dateTime") String dateTime, @Param("activeDate") Integer activeDate,
                        @Param("activeDay") String activeDay, @Param("subCategoryId") Long subCategoryId,
                        @Param("travelTypeId") Long travelTypeId, @Param("flightTypeId") Long flightTypeId,
                        @Param("flightClassId") Long flightClassId, @Param("flightOriginId") Long flightOriginId);

        @Query(OfferRepositoryConstants.CASHBACK_BUS)
        List<Offer> cashbackBus(@Param("active") boolean active, @Param("dummy") boolean dummy,
                        @Param("dateTime") String dateTime, @Param("activeDate") Integer activeDate,
                        @Param("activeDay") String activeDay, @Param("subCategoryId") Long subCategoryId,
                        @Param("from") Long from, @Param("to") Long to);

        @Query(OfferRepositoryConstants.CASHBACK_CAB)
        List<Offer> cashbackCab(@Param("active") boolean active, @Param("dummy") boolean dummy,
                        @Param("dateTime") String dateTime, @Param("activeDate") Integer activeDate,
                        @Param("activeDay") String activeDay, @Param("subCategoryId") Long subCategoryId,
                        @Param("serviceProvidersId") Long[] serviceProvidersId, @Param("cityId") Long cityId);

        @Query(OfferRepositoryConstants.CASHBACK_HOTEL)
        List<Offer> cashbackHotel(@Param("active") boolean active, @Param("dummy") boolean dummy,
                        @Param("dateTime") String dateTime, @Param("activeDate") Integer activeDate,
                        @Param("activeDay") String activeDay, @Param("subCategoryId") Long subCategoryId,
                        @Param("merchantIds") Long[] merchantIds);

        // @EntityGraph(attributePaths = { "merchant", "operatingSystems", "offerReturns" })
        // List<Offer> findDistinctByActiveTrueAndDummyFalseAndSubCategories_IdAndActiveDatesIsNullOrActiveDates_DateAndActiveDaysIsNullOrActiveDays_DayAndServiceProviders_IdAndRechargeInfo_CirclesIsNullOrRechargeInfo_Circles_IdAndRechargeInfo_RechargePlanTypesIsNullOrRechargeInfo_RechargePlanTypes_Id(
        //                 Long subCategoryId, Integer activeDate, String activeDay, Long serviceProviderId, Long circleId,
        //                 Long reechargePlanTypeId);

        // @EntityGraph(attributePaths = { "merchant", "operatingSystems", "offerReturns" })
        // List<Offer> findDistinctByActiveTrueAndDummyFalseAndSubCategories_IdAndServiceProviders_Id(Long subCategoryId,
        //                 Long serviceProviderId);

}
