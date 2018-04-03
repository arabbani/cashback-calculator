package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.RechargePlanType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the RechargePlanType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RechargePlanTypeRepository extends JpaRepository<RechargePlanType, Long> {

}
