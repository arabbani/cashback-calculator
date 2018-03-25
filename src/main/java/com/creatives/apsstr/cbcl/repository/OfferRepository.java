package com.creatives.apsstr.cbcl.repository;

import java.util.List;

import com.creatives.apsstr.cbcl.domain.Offer;
import com.creatives.apsstr.cbcl.helper.constants.OfferRepositoryConstants;
import com.creatives.apsstr.cbcl.helper.constants.SharedRepositoryConstants;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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
			@Param("dateTime") String dateTime, @Param("circleId") Long circleId,
			@Param("reechargePlaneTypeId") Long reechargePlaneTypeId);

	@Query(OfferRepositoryConstants.CASHBACK_DTH)
	List<Offer> findAllToCalculateCashbackForDth(@Param("active") boolean active, @Param("dummy") boolean dummy,
			@Param("subCategoryId") Long subCategoryId, @Param("serviceProviderId") Long serviceProviderId,
			@Param("dateTime") String dateTime);

	@Query(OfferRepositoryConstants.CASHBACK_DATACARD)
	List<Offer> findAllToCalculateCashbackForDatacard(@Param("active") boolean active, @Param("dummy") boolean dummy,
			@Param("subCategoryId") Long subCategoryId, @Param("serviceProviderId") Long serviceProviderId,
			@Param("dateTime") String dateTime, @Param("circleId") Long circleId,
			@Param("reechargePlaneTypeId") Long reechargePlaneTypeId);

}
