package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.AffiliateCredential;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AffiliateCredential entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AffiliateCredentialRepository extends JpaRepository<AffiliateCredential, Long> {

}
