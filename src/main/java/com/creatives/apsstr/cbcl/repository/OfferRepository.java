package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.Offer;
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

    @Query("select distinct offer from Offer offer left join fetch offer.operatingSystems left join fetch offer.cities left join fetch offer.subCategories left join fetch offer.serviceProviders left join fetch offer.activeDates left join fetch offer.activeDays")
    List<Offer> findAllWithEagerRelationships();

    @Query("select offer from Offer offer left join fetch offer.operatingSystems left join fetch offer.cities left join fetch offer.subCategories left join fetch offer.serviceProviders left join fetch offer.activeDates left join fetch offer.activeDays where offer.id =:id")
    Offer findOneWithEagerRelationships(@Param("id") Long id);

    @EntityGraph(attributePaths = { "operatingSystems", "cities", "cities.state", "subCategories",
            "subCategories.category", "serviceProviders", "serviceProviders.subCategories", "activeDates", "activeDays",
            "affiliate", "policy" })
    Offer findOneForAdminViewById(Long id);

    @EntityGraph(attributePaths = { "reechargeInfo", "reechargeInfo.circles", "reechargeInfo.reechargePlanTypes" })
    Offer findOneWithReechargeInfoById(Long id);

    @EntityGraph(attributePaths = { "travelInfo", "travelInfo.types", "travelInfo.flightInfo", })
    Offer findOneWithFlightInfoById(Long id);

    @EntityGraph(attributePaths = { "travelInfo", "travelInfo.types", "travelInfo.busInfo", })
    Offer findOneWithBusInfoById(Long id);

}
