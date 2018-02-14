package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.OfferType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the OfferType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OfferTypeRepository extends JpaRepository<OfferType, Long> {

}
