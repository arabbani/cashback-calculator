package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.OfferReturn;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the OfferReturn entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OfferReturnRepository extends JpaRepository<OfferReturn, Long> {

}
