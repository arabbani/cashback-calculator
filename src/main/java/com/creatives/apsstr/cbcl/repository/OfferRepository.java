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
    
    @Query(OfferRepositoryConstants.DEFAULT + OfferRepositoryConstants.CHILD_RELATIONS
			+ SharedRepositoryConstants.WHERE + OfferRepositoryConstants.WHERE_ID)
	Offer findOneById(@Param("id") Long id);

}
