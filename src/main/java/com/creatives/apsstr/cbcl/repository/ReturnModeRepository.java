package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.ReturnMode;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ReturnMode entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReturnModeRepository extends JpaRepository<ReturnMode, Long> {

}
