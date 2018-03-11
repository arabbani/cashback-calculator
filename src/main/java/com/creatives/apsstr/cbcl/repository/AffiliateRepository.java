package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.Affiliate;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Affiliate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AffiliateRepository extends JpaRepository<Affiliate, Long> {

}
