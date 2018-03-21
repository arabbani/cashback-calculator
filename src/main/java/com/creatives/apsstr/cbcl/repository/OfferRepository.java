package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.Offer;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

import com.creatives.apsstr.cbcl.helper.constants.OfferRepositoryConstants;

/**
 * Spring Data JPA repository for the Offer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {
    @Query("select distinct offer from Offer offer left join fetch offer.operatingSystems left join fetch offer.countries left join fetch offer.states left join fetch offer.cities left join fetch offer.subCategories left join fetch offer.serviceProviders left join fetch offer.activeDates left join fetch offer.activeDays")
    List<Offer> findAllWithEagerRelationships();

    @Query("select offer from Offer offer left join fetch offer.operatingSystems left join fetch offer.countries left join fetch offer.states left join fetch offer.cities left join fetch offer.subCategories left join fetch offer.serviceProviders left join fetch offer.activeDates left join fetch offer.activeDays left join fetch offer.reechargeInfo left join fetch offer.travelInfo where offer.id =:id")
    Offer findOneWithEagerRelationships(@Param("id") Long id);

    @Query(OfferRepositoryConstants.CASHBACK_MOBILE)
	List<Offer> findAllToCalculateCashbackForMobile(@Param("active") boolean active, @Param("dummy") boolean dummy,
			@Param("subCategoryId") Long subCategoryId, @Param("serviceProviderId") Long serviceProviderId,
			@Param("dateTime") String dateTime, @Param("circleId") Long circleId);

}
