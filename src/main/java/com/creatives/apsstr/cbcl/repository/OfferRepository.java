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
                        "subCategories.category", "serviceProviders", "serviceProviders.subCategories", "activeDates",
                        "activeDays", "affiliate", "policy", "offerReturns",
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

        // @EntityGraph(attributePaths = { "merchant", "operatingSystems", "offerReturns" })
        // List<Offer> findDistinctByActiveTrueAndDummyFalseAndSubCategories_IdAndActiveDatesIsNullOrActiveDates_DateAndActiveDaysIsNullOrActiveDays_DayAndServiceProviders_IdAndRechargeInfo_CirclesIsNullOrRechargeInfo_Circles_IdAndRechargeInfo_RechargePlanTypesIsNullOrRechargeInfo_RechargePlanTypes_Id(
        //                 Long subCategoryId, Integer activeDate, String activeDay, Long serviceProviderId, Long circleId,
        //                 Long reechargePlanTypeId);

        // @EntityGraph(attributePaths = { "merchant", "operatingSystems", "offerReturns" })
        // List<Offer> findDistinctByActiveTrueAndDummyFalseAndSubCategories_IdAndServiceProviders_Id(Long subCategoryId,
        //                 Long serviceProviderId);

}
