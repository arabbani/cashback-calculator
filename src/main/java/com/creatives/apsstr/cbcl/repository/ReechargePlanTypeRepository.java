package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.ReechargePlanType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ReechargePlanType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReechargePlanTypeRepository extends JpaRepository<ReechargePlanType, Long> {

}
