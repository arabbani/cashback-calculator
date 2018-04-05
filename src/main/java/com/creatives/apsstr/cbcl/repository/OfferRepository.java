package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.Offer;
import com.creatives.apsstr.cbcl.helper.projections.OfferForReference;
import com.creatives.apsstr.cbcl.helper.constants.OfferRepositoryConstants;

import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Offer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {

        @EntityGraph(attributePaths = { "operatingSystems", "cities", "cities.state", "subCategories",
                        "subCategories.category", "serviceProviders", "serviceProviders.subCategories", "activeDates",
                        "activeDays", "affiliate", "policy", "offerReturns" })
        Offer findOneForAdminViewById(Long id);

        @EntityGraph(attributePaths = { "rechargeInfo", "rechargeInfo.circles", "rechargeInfo.rechargePlanTypes" })
        Offer findOneWithRechargeInfoById(Long id);

        @EntityGraph(attributePaths = { "travelInfo", "travelInfo.types", "travelInfo.flightInfo", })
        Offer findOneWithFlightInfoById(Long id);

        @EntityGraph(attributePaths = { "travelInfo", "travelInfo.types", "travelInfo.busInfo", })
        Offer findOneWithBusInfoById(Long id);

        List<OfferForReference> findForReferenceByIdNotAndActiveTrueAndDummyFalse(Long id);

        List<OfferForReference> findForReferenceByActiveTrueAndDummyFalse();

        @Query(OfferRepositoryConstants.CASHBACK_RECHARGE_WITH_CHILDS)
        List<Offer> cashbackRechargeWithRechargeCondition(@Param("active") boolean active,
                        @Param("dummy") boolean dummy, @Param("subCategoryId") Long subCategoryId,
                        @Param("dateTime") String dateTime, @Param("activeDate") Integer activeDate,
                        @Param("activeDay") String activeDay, @Param("serviceProviderId") Long serviceProviderId,
                        @Param("circleId") Long circleId, @Param("rechargePlaneTypeId") Long rechargePlaneTypeId);

        List<Offer> findDistinctByActiveTrueAndDummyFalseAndSubCategories_IdAndActiveDatesIsNullOrActiveDates_DateAndActiveDaysIsNullOrActiveDays_DayAndServiceProviders_Id(Long subCategoryId, Integer activeDate, String activeDay, Long serviceProviderId);

        // Boolean active, Boolean dummy,
}
