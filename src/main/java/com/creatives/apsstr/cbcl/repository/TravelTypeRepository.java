package com.creatives.apsstr.cbcl.repository;

import com.creatives.apsstr.cbcl.domain.TravelType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TravelType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TravelTypeRepository extends JpaRepository<TravelType, Long> {

}
