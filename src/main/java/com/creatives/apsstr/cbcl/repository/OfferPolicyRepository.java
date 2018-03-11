package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.OfferPolicy;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the OfferPolicy entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OfferPolicyRepository extends JpaRepository<OfferPolicy, Long> {

}
