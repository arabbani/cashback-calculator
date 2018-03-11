package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.ReturnExtras;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ReturnExtras entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReturnExtrasRepository extends JpaRepository<ReturnExtras, Long> {

}
