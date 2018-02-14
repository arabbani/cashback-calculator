package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.Newsletter;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Newsletter entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NewsletterRepository extends JpaRepository<Newsletter, Long> {

}
