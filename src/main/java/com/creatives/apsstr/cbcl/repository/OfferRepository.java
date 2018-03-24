package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.Offer;
import org.springframework.stereotype.Repository;

import com.creatives.apsstr.cbcl.helper.constants.OfferRepositoryConstants;
import com.creatives.apsstr.cbcl.helper.constants.SharedRepositoryConstants;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Offer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {

	@Query(OfferRepositoryConstants.DEFAULT + OfferRepositoryConstants.CHILD_RELATIONS + SharedRepositoryConstants.WHERE
			+ OfferRepositoryConstants.WHERE_ID)
	Offer findOneById(@Param("id") Long id);

	@Query(OfferRepositoryConstants.CASHBACK_MOBILE)
	List<Offer> findAllToCalculateCashbackForMobile(@Param("active") boolean active, @Param("dummy") boolean dummy,
			@Param("subCategoryId") Long subCategoryId, @Param("serviceProviderId") Long serviceProviderId,
			@Param("dateTime") String dateTime, @Param("circleId") Long circleId, @Param("reechargePlaneTypeId") Long reechargePlaneTypeId);

}
